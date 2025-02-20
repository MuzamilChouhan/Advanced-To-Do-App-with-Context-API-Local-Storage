import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { useTodo } from "../context/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [dueDateVal, setDueDateVal] = useState(todo.dueDate || "");
  const [priorityVal, setPriorityVal] = useState(todo.priority || "Medium");
  const { editTodo, deleteTodo, toggleTodo } = useTodo();

  const updateTodo = () => {
    editTodo(todo.id, {
      ...todo,
      todo: todoMsg,
      dueDate: dueDateVal,
      priority: priorityVal,
    });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  // Determine if overdue (if a due date is set and task is not completed)
  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return todo.dueDate < today;
  };

  return (
    <div
      className={`flex flex-col border border-black/10 rounded-lg px-3 py-2 gap-y-2 shadow-md duration-300 hover:scale-110 transition-transform ${
        todo.completed ? "bg-accent text-primary" : "bg-tertiary text-primary"
      }`}
    >
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        {isTodoEditable ? (
          <input
            type="text"
            className="border outline-none w-full bg-tertiary rounded px-2 py-1 text-primary focus:ring-2 focus:ring-primary"
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
          />
        ) : (
          <span className={`w-full ${todo.completed ? "line-through" : ""}`}>
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {isTodoEditable ? (
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 border border-black/10 rounded px-2 py-1 bg-tertiary outline-none text-primary focus:ring-2 focus:ring-primary"
              value={dueDateVal}
              onChange={(e) => setDueDateVal(e.target.value)}
            />
            <select
              className="flex-1 border border-black/10 rounded px-2 py-1 bg-tertiary outline-none text-primary focus:ring-2 focus:ring-primary"
              value={priorityVal}
              onChange={(e) => setPriorityVal(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span>
              Due: {todo.dueDate ? todo.dueDate : "No due date"}
              {isOverdue() && (
                <span className="text-red-500 font-bold ml-1">(Overdue)</span>
              )}
            </span>
            <span>
              Priority:{" "}
              <span
                className={`${
                  todo.priority === "High"
                    ? "text-red-500"
                    : todo.priority === "Low"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {todo.priority}
              </span>
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              updateTodo();
            } else {
              setIsTodoEditable(true);
            }
          }}
          disabled={todo.completed}
          className="disabled:opacity-50 hover:scale-110 transition-transform duration-300"
        >
          {isTodoEditable ? (
            <CiSaveDown2 className="inline-flex text-2xl cursor-pointer" />
          ) : (
            <CiEdit className="inline-flex text-2xl cursor-pointer" />
          )}
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="disabled:opacity-50 hover:scale-110 transition-transform duration-300"
        >
          <MdDelete className="inline-flex text-2xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
