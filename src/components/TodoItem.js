import { useState } from "react";


const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedtask, setEditedtask] = useState(todo.task);

    const updateTodo = () => {
      todo.complete = !todo.complete
  
      fetch("http://localhost:8000/todos/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      }).then(() => {
        console.log('todo updated.')
        setRefresh(true)
      })
    }
  
    const deleteTodo = () => {
      fetch("http://localhost:8000/todos/" + todo.id, {
        method: "DELETE",
      }).then(() => {
        console.log('todo deleted.')
        setRefresh(true);
      });
    };


    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleEditSave = () => {
      todo.task = editedtask;
  
      fetch('http://localhost:8000/todos/' + todo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      }).then(() => {
        console.log('todo edited.');
        setIsEditing(false);
        setRefresh(true);
      });
    };
  
    const handleEditCancel = () => {
      setEditedtask(todo.task);
      setIsEditing(false);
    };
  
    return (
      <>
      <li className={`${todo.complete ? "checked" : ""}`}>
        {isEditing ? (
        <div>
          <input type="text" value={editedtask} onChange={(e) => setEditedtask(e.target.value)} />
          <button onClick={handleEditSave}>Save</button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      ) : (
        <div onClick={updateTodo}>{todo.task}</div>
      )}
        <span className="close" onClick={deleteTodo}><i class="fa-solid fa-trash"></i>x</span>
        <span>{!isEditing && <button  className="btn-edit" onClick={handleEditClick}>Edit</button>}</span>
      </li>
      
      </>
    );
  };
  
  export default TodoItem;