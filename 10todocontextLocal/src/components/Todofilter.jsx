import React from "react";
import { useTodo } from "../contexts/TodoContext";

const FILTERS = ["all", "active", "completed"];

function TodoFilter() {
  const { filter, setFilter } = useTodo();

  return (
    <div className="flex gap-2 justify-center mb-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full text-sm capitalize transition-all duration-200 ${
            filter === f
              ? "bg-green-600 text-white shadow-md"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
