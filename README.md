## useState

* set function receives previous value in argument
```js
function increment() {
 setCount(prevCount=> prevCount+1)
} 
```



## useReducer

* Similar to useState
* allow more complex way to handle state. We can change state based on action we send to useReducer

* generally we are dealing with object as state in useReducer, as simple value can be handle easily with usetate

* it takes two argumnet
    * reducer -> function which handle the state change
    * initailValue -> initial object
* UseReducer return two items
    * state -> current state
    * dispatch -> similar to setState. Use to call reducer function, which updates the state.
* reducer function takes two argument
    * initial state -> we pass the current state, which can be utilized to compare and update state
    * action -> this is what we pass on dispatch function call. According to the action we receieve, we perform state manipulation

#### We can simply call dipatch without argument also, in case we do not have multiple action type
* dispatch is just a trigger that we create to call reducer function.    
```js
const [state,dispatch] = useReducer(reducer,{count:0})
function reducer(state,action) {
    // we are not using action here
    return {count:state.count+1}
}

function increment() {
    dispatch()
}
```

* dispatch with argument   
```js
const [state,dispatch] = useReducer(reducer,{count:0})
function reducer(state,action) {
    switch(action.type)// we are receiving type from dispatch 
    {
        case : 'increment'
        return {count:state.count+1}

        case:'decrement'
        return {count:state.count-1}

        default 
        return state
    }
}

function increment() {
    dispatch({type:'increment'})
}
function decrement() {
    dispatch({type:'decrement'})
}
```

* Reducer function doesnot have access to other state directly. We need to pass data via actions.

```js

  let [name, setName] = useState('');
  let [toDos,dispatch ]= useReducer(reducer,[])

  function reducer(toDos,action) {  //toDos = current state
    switch(action.type) {
      case 'add-todo' :
        //returning new state, which can be accesible via toDos
        return[...toDos,addNewToDo(action.payload.name)] //accessing data via action.payload
      default:
        {
          console.log("action dispatched dfault")
          return toDos}

    }
  }
  function addNewToDo(name) {
    return {id:Date.now(),data:name}
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    dispatch({type:'add-todo',payload:{name}}) //sending data in action
    setName('') // re-setting data
  }

  

  return (
    <>
      <div className="App" style={{ margin: "10px" }}>
        <button style={{ margin: "10px" }} onClick={increment}>
          +
        </button>
        {count}
        <button style={{ margin: "10px" }} onClick={decrement}>
          -
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        </form>
        <p>
          {toDos.map(todo=>
            <p> {todo.id}  -   {todo.data}</p>
          )}
        </p>
      </div>
    </>
  );
  ```


  #### useContext

* Below is simplest implementation 
* need to create a context -- export const ThemeContext = React.createContext(); 
* wrap child to which you want to have access to value with context.Provide
* access the value using hook or context.Consumer

```js
import React, { Component, useContext, useState } from "react";

export const ThemeContext = React.createContext(); 
// creating  and exporting context 
// in child component we need to import this to have access to passed values.

function ContextIndex() {
  const [dark, setDark] = useState(false);
  function setTheme() {
    setDark((prevDarkv) => !prevDarkv);
  }
  return (
    <div>
      <ThemeContext.Provider value={dark}>
        {
        // wrapping below component with context and pass value in context.
        // all the child component will have access to the value passed in contect wrapper
        }
        <button onClick={setTheme}>Toggle </button>
        <FuncBasedComponent/>
        <ClassContextComponent />
      </ThemeContext.Provider>
    </div>
  );
}

export default ContextIndex;

// class based component with access to context values
export class ClassContextComponent extends Component {
    themeStyle(dark) {
      return {
        backgroundColor: dark ? "#ccc" : "#333",
        color:dark? '#333':'#ccc',
        padding:'2rem',
        margin: "2rem",
      };
    }
  
    render() {
      //needs to import themecontext if used in different file
      return (
            // In class based component we need to wrap part with consumer to provide access to value
            // themecolor is value passed by context wrapper.
        <ThemeContext.Consumer> 
            
          {(themeColor) => { 
            return <div style={this.themeStyle(themeColor)}>ClassTheme</div>;
          }}
        </ThemeContext.Consumer>
      );
    }
  }


  export function FuncBasedComponent () {
    const theme = useContext(ThemeContext) // fetching value from parent context wrapper
    const themeStyle  = {
          backgroundColor: theme ? "#ccc" : "#333",
          color:theme? '#333':'#ccc',
          padding:'2rem',
          margin: "2rem",
        };
      
    return (
        <div style = {themeStyle}>
            function based component
        </div>
    )
  }

  ```

  * Refactor code for useContext to move all context related functionality to one file and render children and pass only values and function to children.
  * all the logic of function is written in context file rather than in children.
  * children will just call the function and use the value.

```js
import React, { useContext, useState } from "react";

export const ThemeContext = React.createContext();
export function useTheme() {
  return useContext(ThemeContext);
}
function RefactoruseContext() {
  return (
    <ThemeProvider>
      <Children />
    </ThemeProvider>
  );
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    console.log('toggle')
    setDarkTheme((prev) => !prev);
  };

  return (
    <div>
      <ThemeContext.Provider value={{ toggleTheme, darkTheme }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
}

export function Children() {
  const { toggleTheme, darkTheme } = useTheme();
  const themeStyle = {
    backgroundColor: darkTheme ? "#ccc" : "#333",
    color: darkTheme ? "#333" : "#ccc",
    padding: "2rem",
    margin: "2rem",
  };
  console.log(darkTheme)

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>
      <div style={themeStyle}>Refactor useContext Code</div>
    </>
  )
}

export default RefactoruseContext;
```

## memo, useCallback, useMemo

* MEMO

    * We use memo when we do not want child component to re-render on rendering of parent component

* useCallback
    * but if we pass any object or function to child, *memo will fail* as memo only does shallow comparision, and re-rendering on parent create new object/function, causing memo to think this is a new variable.

    * In this case we need to wrap our function in useCallback to prevent re-rendering child component

* useMemo
    * In the scenarion where we do not want an expensive function to run again unless dependency changes.

* memo and callback is for prevent rendering child component, while useMemo is to prevent function executing.

```js
import React, { useCallback, useMemo, useState } from 'react'
import Plain from './plain'
import Memo from './memo'
import BrokenMemo from './BrokenMemo'

function MemoIndex() {
    const [counter,changeCounter] = useState(0)
    function increase(){
        changeCounter(prev=>prev+1)
    }
    function decrease(){
        changeCounter(prev=>prev-1)
    }
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const memoizedChangeNumber = useCallback(()=>changeNumber,[])
    function changeNumber() {
        // any function inside it
    }

    const memoizedExpensive = useMemo(()=> expensive(),[...arr] )
    function expensive() {
        console.log("EXPENSIVE FUNCTION RUNNING")
        return Math.max(...arr)
    }
  return (
    <>
        <div>
            <span ><button onClick={increase} style={{margin: '5px'}}>+</button> {counter}<button onClick={decrease} style={{margin: '5px'}}>-</button></span>
        </div>
        <Plain/> {/* Render every time when counter changes in main page */}
        <Memo/>  {/* Because of memo, does not render on counter changes */}
        <BrokenMemo func={changeNumber} data={'NOT memoized func passed '}/>  {/* Every render create new variable for fumction, memo thinks it is a new variable and re-render */}
        <BrokenMemo func={memoizedChangeNumber} data={'YES Memoized func'}/>  {/* Function is memoized, hence no re-rendering */}

        <div>
            {memoizedExpensive}
        </div>
    </>
  )
}

export default MemoIndex

///////////////////////
import React from 'react'

function Plain() {
    console.log("MEMOIZATION - without any Memoization")
  return (
    <div>Plain without any Memoization</div>
  )
}

export default Plain

////////////////////////

import React, {memo} from 'react'

function Memo() {
  console.log("MEMOIZATION - WITH MEMO")  
  return (
    <div>memo</div>
  )
}

export default memo(Memo)

//////////////////////

import React , {memo}from 'react'

function BrokenMemo({data}) {
    console.log(`MEMOIZATION - ${data}`)
  return (
    <div>{data}</div>
  )
}

export default memo(BrokenMemo)
```