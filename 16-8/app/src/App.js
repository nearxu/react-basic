import React from "react";
// import Old from "./suspense/1";
// import ContextData from "./suspense/2";
import SuspenseComponent from "./suspense/3";
// import SimpleSuspense from "./suspense/4";
// import AppHook from "./hook";
import DiffHocHook from "./render-props-hoc-hook";
function App() {
  return (
    <div className="App">
      <DiffHocHook />
    </div>
  );
}

export default App;
