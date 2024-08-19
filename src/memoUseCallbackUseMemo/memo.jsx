import React, {memo} from 'react'

function Memo() {
  console.log("MEMOIZATION - WITH MEMO")  
  return (
    <div>memo</div>
  )
}

export default memo(Memo)