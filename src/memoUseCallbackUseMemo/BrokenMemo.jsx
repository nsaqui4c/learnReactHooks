import React , {memo}from 'react'

function BrokenMemo({data}) {
    console.log(`MEMOIZATION - ${data}`)
  return (
    <div>{data}</div>
  )
}

export default memo(BrokenMemo)