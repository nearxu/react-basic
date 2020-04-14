import React, { useEffect, useState } from "react";

// useEffect 代替 componentDidMount
//  useEffect 取数？参数 [] 代表什么
// useEffect 中拿到的 state 或 props 是旧的

// https://github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md

const getSize = () => window.innerHeight;

const useSize = () => {
  const [size, setSize] = React.useState(getSize());
  const handleSize = () => {
    setSize(getSize());
  };

  // [] only once ,like componentDidMount
  React.useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  return size;
};

const EffectApp = () => {
  const size = useSize();
  return (
    <div>
      <h1>useSize like hoc</h1>
      <p>innerHeight: {size}</p>
    </div>
  );
};

const ReactLive = () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    // 参数2 不变执行一次
    console.log("componentDidMount");
  }, []);

  useEffect(() => {
    // 参数2 数值变化执行
    console.log("componentDidUpdate");
  }, [num]);

  useEffect(() => {
    // 参数2 数值变化执行
    return () => {
      console.log("componentWillUnMount");
    };
  });

  return <div onClick={() => setNum(num + 1)}>{num}</div>;
};

const AppEffectComponent = () => {
  return (
    <div>
      <EffectApp />
      <ReactLive />
    </div>
  );
};

export default AppEffectComponent;
