import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";


const TodoList = ({isRefresh, setRefresh}) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false)
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false)
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  //filter data

  const filteredData =
  filter === "all"
    ? todos
    : filter === "done"
    ? todos.filter((item) => item.complete === true)
    : filter === "todo" &&
      todos.filter((item) => item.complete === false);


  return (
    <>
        <div id="todo-header" className="header">
      <h3>Filter by search</h3>
	  <input 
		  type="text"
		  onChange={(e) => setSearch(e.target.value)}
	  />
    </div>
    <div className="listButton">
					<button className="btn-filter"	onClick={() => setFilter("all")}>	All</button>
					<button	className="btn-filter" onClick={() => setFilter("done")}>Done</button>
					<button	className="btn-filter"	onClick={() => setFilter("todo")}>Todo</button>
							</div>
        <ul id="todo-list">
      {filteredData.filter((item) => {
                                                return search.toLowerCase() === ''
                                                ? item
                                                : item.task.toLowerCase().includes(search);
                                        }).map((todo) => (
        <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
      ))}
    </ul>
    {/* <div className="btn-delete-list">
    <button className="btn-delete">Delete Done Task</button>
    <button className="btn-delete" onClick={HandleClear}>Delete All Task</button>
    </div> */}
    </>
  );
};

export default TodoList;