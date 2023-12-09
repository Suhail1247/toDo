import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [edit,setEdit]=useState(0)


  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
      setErrorMessage("");
      setEdit("")
    }
    else{
      setErrorMessage("task cant be empty");
    }
    if(edit){
      const editTodo=todos.find((val)=>val.id===edit)
      const updateTodo=todos.map((val)=>val.id===editTodo.id?
      (val={id:val.id, list : todo}) : (val={id:val.id,list:val.list}))
      setTodos(updateTodo)
      setEdit(0);
      setTodo("")
    }
  };
  const inpRef = useRef("null");

  useEffect(() => {
    inpRef.current.focus();
    // Save todos to localStorage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDelete = (idToDlt) => {
    // todos.filter((val)=> val.id !== idtoDlt);
    setTodos(todos.filter((val) => val.id !== idToDlt));
  };

  const onComplete = (idToCmp) => {
    let complete = todos.map((val) => {
      if (val.id === idToCmp){
         return { ...val, status: !val.status };
      }
      return val
    });
    setTodos(complete)
  };


  const onEdit=(idToEdit)=>{
  const editTodo =  todos.find((val)=>val.id==idToEdit)
  console.log(editTodo);
  setTodo(editTodo.list)
  inpRef.current.focus();
  setEdit(editTodo.id)
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="input">
        <input
          ref={inpRef}
          value={todo}
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          placeholder="🖊️ Add item..."
        />

        <button
          onClick={addTodo}
          className="btn btn-success"
          style={{ marginLeft: "5px" }}
        >{edit? 'Update' : 'Add'}</button>


      </div><p className="error">
      {errorMessage}</p>
      {todos.map((val) => (
        <div className="todos">
          <div className="todo">
            <div className="left">
              <p id={val.status ? "listItem" : "null"}>{val.list}</p>
            </div>
            <div className="right">
              <i
                className="fa-solid fa-check-double space"
                title="Complete"
                onClick={() => onComplete(val.id)}
              ></i>
              <i
                className="fa-regular fa-pen-to-square space"
                title="update"
                onClick={()=>onEdit(val.id)}
              ></i>
              <i
                className="fas fa-times"
                title="Delete"
                onClick={() => {
                  onDelete(val.id);
                }}
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
