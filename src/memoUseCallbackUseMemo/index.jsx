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