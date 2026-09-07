import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import { TodoForm, TodoItem, TodoFilter, TodoStats } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <TodoProvider
      value={{
        todos,
        filter,
        setFilter,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        clearCompleted,
      }}
    >
      <div className="min-h-screen py-8 bg-gradient-to-br from-[#0f1c33] via-[#172842] to-[#1e3a5f]">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl px-4 py-5 text-white bg-white/5 backdrop-blur-sm border border-white/10">
          <h1 className="text-3xl font-bold text-center mb-1 mt-2">
            📝 Manage Your Todos
          </h1>
          <p className="text-center text-white/50 text-sm mb-6">
            Stay organized, stay productive
          </p>

          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>

          {todos.length > 0 && (
            <>
              <TodoFilter />
              <TodoStats />
            </>
          )}

          <div className="flex flex-wrap gap-y-3">
            {filteredTodos.length === 0 ? (
              <p className="w-full text-center text-white/40 py-10">
                {todos.length === 0
                  ? "No todos yet. Add one above! 🎉"
                  : "No todos match this filter."}
              </p>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
