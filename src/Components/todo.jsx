import { useState, useRef, useEffect } from "react";
import "./css/todo.css";
import Todoitem from "./todoitem";

const Todo = () => {
  const countRef = useRef(0); // Use useRef instead of let count
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    const newTodo = {
      no: countRef.current++, // Use countRef.current
      text: inputRef.current.value,
      display: "",
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", countRef.current);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);

    const savedCount = localStorage.getItem("todos_count");
    countRef.current = savedCount ? parseInt(savedCount, 10) : 0; // Convert to number
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
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
        {todos.map((item, index) => (
          <Todoitem
            key={index}
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
