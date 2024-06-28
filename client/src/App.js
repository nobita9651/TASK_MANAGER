// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

const API_URL = process.env.REACT_APP_API_URL || "https://task-manager-wxnk.onrender.com/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskText) => {
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, {
        text: taskText,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskStatus = async (taskId, completed) => {
    try {
      const newCompleted = !completed;
      await axios.put(`${API_URL}/api/tasks/${taskId}`, {
        completed: newCompleted,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, completed: newCompleted } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (taskId, newText) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${taskId}`, {
        text: newText,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, text: newText } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="App">
      <div className="container">
        <Header />
        <TaskForm onAddTask={addTask} />
        <TaskFilter currentFilter={filter} onChangeFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggleTaskStatus={toggleTaskStatus}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;
