import { useEffect, useState } from "react";
import { TodoContextProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const editTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
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

  // Filter todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle dark mode by updating the <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <TodoContextProvider value={{ todos, addTodo, deleteTodo, editTodo, toggleTodo }}>
      <div className="min-h-screen py-8 transition-colors duration-300 bg-gradient-to-r from-secondary to-tertiary dark:from-gray-900 dark:to-gray-700">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-tertiary text-primary dark:bg-gray-800 dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-center">Manage Your Todos</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-accent rounded-lg text-sm hover:scale-110 transition-transform duration-300"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-tertiary border border-black/10 outline-none text-primary focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
