import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store";  // Redux Action

const TaskInput = () => {
    const [task, setTask] = useState("");    // Task Input State
    const [priority, setPriority] = useState("Medium");  // Priority Dropdown
    const [weatherData, setWeatherData] = useState(null); // Weather Data
    const dispatch = useDispatch();

    useEffect(() => {
        getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to get user's location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // Fetch Weather Data using API
    const fetchWeather = async (lat, lon) => {
        const apiKey = "c1a269a7605c58fe9d1dacab8074ffb8";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.main) {
            setWeatherData({
                city: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].description,
            });
        } else {
            setWeatherData(null);
        }
    };

    // Add Task Handler
    const handleAddTask = () => {
        if (task.trim() === "") return;  // If task is empty, don't add

        const newTask = {
            id: Date.now(),
            text: task,
            priority,
            weather: weatherData, // Store weather data with task
        };

        // Dispatch the new task to Redux Store
        dispatch(addTask(newTask));
        setTask("");  // Reset task input
    };

    return (
        <div className="container mt-3">
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}  // Set task value
            />
            <select
                className="form-control mb-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}  // Set priority value
            >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
            </select>

            <button className="btn btn-primary" onClick={handleAddTask}>
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;