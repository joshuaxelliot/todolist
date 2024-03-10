import { useState, useEffect } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoTitle.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
    }
  };

  const toggleDone = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-3xl font-bold mb-2 flex justify-center p-2">Todolist</h2>
      <div className="flex justify-between">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="border border-gray-400 pr-28 pl-2 py-3 rounded-md mb-2"
        />
        <button
          onClick={addTodo}
          className="bg-slate-500 hover:bg-slate-700 text-white px-4 py-2 rounded-md mb-2"
        >
          Add task
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border-b border-gray-400 p-2 mb-2">
            <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
            <div>
              <button onClick={() => toggleDone(todo.id)} className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-md">
                {todo.done ? <FaXmark /> : <FaCheck />}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md ml-2">
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
