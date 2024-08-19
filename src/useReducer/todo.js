import React from 'react'

function Todo({todo,dispatch}) {
    console.log('rendered')
  return (
    
    <div>
        <span key={todo.id} style={{color:todo.complete?'green':'red'}}>{todo.data} 
            <button onClick={()=>dispatch({type:'toggle',payload:{id:todo.id}})}>toggle</button>
        </span>
    </div>
  )
}

export default Todo