import React, { useState } from "react";

function TaskItem({ task, onDeleteTask, onToggleTaskStatus, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSaveClick = () => {
    onEditTask(task._id, newText);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTaskStatus(task._id, task.completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
      <div className="task-buttons">
        {isEditing ? (
          <button onClick={handleSaveClick} className="save-button">
            <i className="fas fa-save"></i> Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <i className="fas fa-edit"></i> Edit
          </button>
        )}
        <button
          onClick={() => onDeleteTask(task._id)}
          className="delete-button"
        >
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
