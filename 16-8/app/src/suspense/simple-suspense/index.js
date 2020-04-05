import React from "react";
import Suspense from "./suspense";

const wrapPromise = (promise) => {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }

      return result;
    },
  };
};

export const randomNumber = (wait) => {
  return new Promise((res) => setTimeout(() => res(Math.random()), wait));
};

export const createResource = (wait) => {
  return {
    num: wrapPromise(randomNumber(wait)),
  };
};

export const Num = ({ resource }) => {
  const n = resource.num.read();
  return <div>your random number is {n}</div>;
};

const App = () => {
  const resource = createResource(3000);
  return (
    <Suspense>
      <Num resource={resource} />
    </Suspense>
  );
};

export default App;
