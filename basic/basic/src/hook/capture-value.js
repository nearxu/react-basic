
import React from 'react';

const Count = () => {
  const [count, setCount] = React.useState(0);
  // 在 log 函数执行的那个 Render 过程里,count = 0
  // setCount new render ,so log not render
  const sleep3Log = () => {
    setTimeout(() => {
      console.log('3 s count:' + count);
    }, 3000);
  }

  // React.useEffect(() => {
  //   // useEffect so captrun val count=0
  //   console.log(count)
  // }, [])

  // how to not capture val ?
  // ref mutable ,state immutable
  const lastCount = React.useRef(count);
  React.useEffect(() => {
    lastCount.current = count;
    setTimeout(() => console.log('lastcount:' + lastCount.current), 3000)
  })
  return (
    <div>
      <button onClick={() => { sleep3Log(); setCount(5) }}>set count 5</button>
      <p>{count}</p>
    </div>
  )
}

export const CapTurnComponent = () => {
  return (
    <div>
      <Count />
    </div>
  )
}