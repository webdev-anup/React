import React from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoStats() {
  const { todos, clearCompleted } = useTodo();

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="flex items-center justify-between text-sm text-white/70 px-1 mb-3">
      <span>
        {activeCount} item{activeCount !== 1 ? "s" : ""} left
      </span>
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-red-300 hover:text-red-400 transition-colors"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoStats;
