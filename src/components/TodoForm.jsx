import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const { addTodo } = useTodo();
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, dueDate, priority, completed: false });
    setTodo("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded px-3 outline-none duration-150 bg-tertiary py-1.5 text-primary"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="date"
          className="flex-1 border border-black/10 rounded px-3 py-1.5 bg-tertiary outline-none text-primary"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="flex-1 border border-black/10 rounded px-3 py-1.5 bg-tertiary outline-none text-primary"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button type="submit" className="rounded px-3 py-1 bg-accent text-primary">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
