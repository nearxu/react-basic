import React from "react";
import ClassComponent from "./class";
import HocComponent from "./hoc";
import RenderComponent from "./render-props";
import HookComponent from "./hook";

const App = () => {
  return (
    <div>
      <ClassComponent />
      <HocComponent />
      <RenderComponent />
      <HookComponent />
    </div>
  );
};

export default App;
