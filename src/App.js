import React from "react";
import { useSelector } from "react-redux";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import Login from "./Login";

const App = () => {
  const isAuthenticated = useSelector((state) => state.tasks.isAuthenticated);

  return (
    <div className="container mt-4">
      {isAuthenticated ? <div>
        <h2 className="text-center">To-Do Application</h2>
        <TaskInput />
        <TaskList />
      </div> : <Login />}
    </div>
  );
};

export default App;
