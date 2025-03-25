import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store";  // login action import

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Check if both username and password are not empty
        if (username.trim() && password.trim()) {
            dispatch(login({ username, password })); // Dispatch login with both username and password
        } else {
            alert("Both fields are required");
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card p-4 shadow-sm rounded" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center text-primary mb-4">Please Login</h3>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    onClick={handleLogin} 
                    className="btn btn-primary w-100 py-2"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;