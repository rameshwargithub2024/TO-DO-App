import "./css/Todoitem.css";

const Todoitem = ({ no, display, text, setTodos }) => {
  const deleted = (no) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.no !== no);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const toggle = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.no === no
          ? { ...todo, display: todo.display === "" ? "line-through" : "" }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div className="todoitems">
      <div className={`todoitemsContainer`} onClick={toggle}>
        {display === "" ? (
          <img src="/unchecks.png" alt="" width="12%" />
        ) : (
          <img src="/tick.png" alt="" width="10%" />
        )}

        <div className="todo-items-text" style={{ textDecoration: display }}>
          {text}
        </div>
      </div>
      <img
        src="/cross.png"
        className="crossItem"
        onClick={() => deleted(no)}
        alt=""
        width="10%"
      />
    </div>
  );
};

export default Todoitem;
