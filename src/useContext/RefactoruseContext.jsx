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

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>
      <div style={themeStyle}>Refactor useContext Code</div>
    </>
  )
}

export default RefactoruseContext;
