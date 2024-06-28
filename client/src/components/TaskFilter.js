// TaskFilter.js

import React from "react";

function TaskFilter({ currentFilter, onChangeFilter }) {
  const filters = ["All", "Active", "Completed"];

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          className={currentFilter === filter ? "active" : ""}
          onClick={() => onChangeFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
