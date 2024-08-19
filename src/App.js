import { useReducer, useState } from "react";
import Reducer from "./useReducer/reducer";
import ContextIndex from "./useContext/contextIndex";
import RefactoruseContext from "./useContext/RefactoruseContext";
import MemoIndex from "./memoUseCallbackUseMemo/index";

function App() {
  let [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <>
      <div className="App" style={{ margin: "10px", border:'3px 0 0 0 solid #ccc' }}>
        <button style={{ margin: "10px" }} onClick={increment}>
          +
        </button>
        {count}
        <button style={{ margin: "10px" }} onClick={decrement}>
          -
        </button>
      </div>
      <div style={{ margin: "10px",padding: "10px",border:'3px solid #ccc' }}>
        <Reducer />
      </div>
      <div style={{ margin: "10px",padding: "10px",border:'3px solid #ccc' }}>
        <ContextIndex />
      </div>
      <div style={{ margin: "10px",padding: "10px",border:'3px solid #ccc' }}>
        <RefactoruseContext/>
      </div>

      <div style={{ margin: "10px",padding: "10px",border:'3px solid #ccc' }}>
        <MemoIndex/>
      </div>

    </>
  )
}

export default App;
