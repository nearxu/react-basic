import React from "react";
import UseStateComponent from "./useState";
import UseEffectComponent from "./useEffect";
import MemoComponent from "./useMemo";

const App = () => {
  return (
    <div>
      <UseStateComponent />
      <UseEffectComponent />
      <MemoComponent />
    </div>
  );
};

export default App;
