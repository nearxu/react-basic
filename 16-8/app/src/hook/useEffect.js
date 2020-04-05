import React from "react";

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

export const AppEffectComponent = () => {
  return (
    <div>
      <EffectApp />
    </div>
  );
};
