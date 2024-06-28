// TaskForm.js

import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") {
      return;
    }

    onAddTask(taskText);
    setTaskText("");
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TaskForm;
