import React, { memo }  from "react";
import Todo from "./todo";
import { useReducer, useState } from "react";

function Reducer() {
  let [name, setName] = useState("");
  let [toDos, dispatch] = useReducer(reducer, []);

  function reducer(toDos, action) {
    switch (action.type) {
      case "add-todo":
        return [...toDos, addNewToDo(action.payload.name)];
        case "toggle":
            {
                return toDos.map(todo=>{
                    if(todo.id === action.payload.id)
                        return {...todo,complete:!todo.complete}
                    else
                        return todo;
                })
            }
      default: {
        console.log("action dispatched default");
        return toDos;
      }
    }
  }
  function addNewToDo(name) {
    return { id: Date.now(), data: name,complete:false };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add-todo", payload: { name } });
    setName("");

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </form>
      <div>
          {toDos.map(todo => <Todo todo ={todo} dispatch={dispatch}/>)}
      </div>
      
    </div>
  );
}

export default Reducer;
