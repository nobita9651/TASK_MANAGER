import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleTaskStatus, onDeleteTask, onEditTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleTaskStatus={onToggleTaskStatus}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask} // Ensure this prop is passed
        />
      ))}
    </ul>
  );
}

export default TaskList;
