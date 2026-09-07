import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const inputRef = useRef(null);

  const editTodo = () => {
    if (!todoMsg.trim()) return;
    updateTodo(todo.id, { ...todo, todo: todoMsg.trim() });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") editTodo();
    if (e.key === "Escape") {
      setTodoMsg(todo.todo);
      setIsTodoEditable(false);
    }
  };

  useEffect(() => {
    if (isTodoEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTodoEditable]);

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-2 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black animate-fadeIn ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-green-600 w-5"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        ref={inputRef}
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through text-black/50" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 transition-colors"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-red-100 shrink-0 transition-colors"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
