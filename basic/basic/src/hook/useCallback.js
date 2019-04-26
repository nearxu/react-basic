import React from 'react';

// ，我们需要利用 useCallback 包裹，并传一个空数组，来保证永远只监听一次，而且不需要在组件销毁时注销这个 callback
const useInput = (init) => {
  let [val, setVal] = React.useState(init);
  let onChange = React.useCallback(
    (e) => {
      setVal(e.target.value)
    },
    [],
  )
  return {
    val,
    onChange
  }
}

// 不仅没有占用组件自己的 state,也不需要手写 onChange 回调函数
const App = () => {
  const name = useInput('');
  return (
    <div>
      <input {...name} />
      <p>{name.val}</p>
    </div>
  )
}

export const CallbackApp = () => {
  return (
    <div>
      <App />
    </div>
  )
}