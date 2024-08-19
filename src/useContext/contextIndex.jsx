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
