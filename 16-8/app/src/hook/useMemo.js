import React, { useState, useMemo } from "react";

const getText = (name) => {
  return "hello" + name;
};

const Child = (props) => {
  const greet1 = getText(props.name1);
  const greet2 = useMemo(() => getText(props.name1), [props.name1]);
  console.log("child render");
  return (
    <div>
      name1:{props.name1}
      <br />
      name2: {props.name2}
      <br />
      greet1: name1 and name2 all change {greet1}
      <br />
      greet1: name1 have memo {greet2}
    </div>
  );
};

const MemoComponent = () => {
  const [name1, setName] = useState("");
  const [name2, setName2] = useState("");
  return (
    <div>
      name1: <input onChange={(e) => setName(e.target.value)} />
      <br />
      name2 : <input onChange={(e) => setName2(e.target.value)} />
      <br />
      greet useMemo: <Child name1={name1} name2={name2} />
    </div>
  );
};

export default MemoComponent;
