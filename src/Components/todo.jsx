import { useState, useRef, useEffect } from "react";
import "./css/todo.css";
import Todoitem from "./todoitem";

const Todo = () => {
  const countRef = useRef(0);
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    const text = inputRef.current.value.trim();
    if (!text) return; // Prevent empty todos

    const newTodo = {
      no: countRef.current++,
      text: text,
      display: "",
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    inputRef.current.value = "";
    localStorage.setItem("todos_count", countRef.current);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);

    const savedCount = localStorage.getItem("todos_count");
    countRef.current = savedCount ? parseInt(savedCount, 10) : 0;
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task..."
          className="todo-input"
        />
        <div className="todo-add-btn" onClick={add}>
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item) => (
          <Todoitem
            key={item.no}
            setTodos={setTodos}
            no={item.no}
            display={item.display}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
