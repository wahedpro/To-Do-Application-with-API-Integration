import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Fetch Weather API for a specific city using Fetch API
export const fetchWeather = createAsyncThunk("tasks/fetchWeather", async (city) => {
    const apiKey = "c1a269a7605c58fe9d1dacab8074ffb8";  // API Key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log('Weather Data:', data.weather[0].main);  // Check if data is fetched correctly
    return data;
});

// Initial State
const initialState = {
    tasks: [],
    weather: {},
    weatherError: null, // Added error handling state
    isAuthenticated: false, // Add isAuthenticated to track login state
    user: null, // Add user information (optional)
};

// Create Task Slice
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Set user info (can be mock data)
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.weather = action.payload;
            state.weatherError = null; // Clear error on successful fetch
        });
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.weather = {};
            state.weatherError = action.error.message; // Storing error message
        });
    },
});

// Redux Persist Configuration
const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    tasks: taskSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Export Actions
export const { addTask, deleteTask, login, logout } = taskSlice.actions;
