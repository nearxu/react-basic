import React, { useState, useEffect } from "react";

// atention hook must use 'use' head
const useMousePoint = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const getMousePosition = (e) => {
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };
  useEffect(() => {
    document.addEventListener("mousemove", getMousePosition);
    return () => {
      document.removeEventListener("mousemove", getMousePosition);
    };
  });
  return {
    positionX: positionX,
    positionY: positionY,
  };
};

const App = () => {
  const mousePosition = useMousePoint();
  return (
    <div>
      <span>鼠标的横坐标{mousePosition.positionX}</span>
      <span>鼠标的纵坐标{mousePosition.positionY}</span>
    </div>
  );
};

export default App;
