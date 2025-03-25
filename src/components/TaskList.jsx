import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, deleteTask, logout } from "../store";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const weather = useSelector((state) => state.tasks.weather);

  useEffect(() => {
    if (tasks.length > 0) {
      dispatch(fetchWeather('Dhaka')); // Fetch weather when tasks are available
    }
  }, [tasks, dispatch]);

  // Sorting the tasks based on priority without mutating the state
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // logout function
  const handleLogout = () => {
    dispatch(logout()); // dispatch the logout action to clear user info
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-primary mb-4">📋 Task List</h4>

      {/* logout button */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-muted">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item rounded-lg p-3 mb-2 bg-light"
            >
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="mb-3 mb-md-0">
                  <h6
                    className={`text-${task.priority === "High"
                      ? "danger"
                      : task.priority === "Medium"
                        ? "warning"
                        : "success"} font-weight-bold`}
                  >
                    {task.text}
                  </h6>
                  <p className="text-muted mb-2">
                    <strong>Priority:</strong> {task.priority}
                  </p>
                </div>

                <div className="mt-3 mt-md-0">
                  {weather && weather.main ? (
                    <>
                      <p className="text-muted mb-1">
                        <strong>Weather:</strong> {weather.main.temp}°C,{" "}
                        {weather.weather[0].description}
                      </p>
                    </>
                  ) : (
                    <p className="text-muted">Weather info unavailable...</p>
                  )}
                </div>

                <div className="mt-3 mt-md-0">
                  <button
                    className="btn btn-danger btn-sm rounded-pill transition-all ease-in-out duration-300 hover:bg-danger hover:text-white"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
