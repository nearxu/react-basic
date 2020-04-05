import React, { Component, Suspense } from "react";

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

// v1
// const App = () => {
//   return (
//     <Suspense fallback={<h1>loading num...</h1>}>
//       <Num resource={resource} />
//     </Suspense>
//   );
// }

const App = () => {
  // content
  const resource = createResource(1000);
  // parent
  const presource = createResource(2000);
  // child
  const cresource = createResource(3000);

  return (
    <div>
      <Suspense fallback={<h1>loading content...</h1>}>
        <Num resource={resource} />
        <Suspense fallback={<h1>loading parent...</h1>}>
          <Num resource={presource} />
          <Suspense fallback={<h1>loading children...</h1>}>
            <Num resource={cresource} />
          </Suspense>
        </Suspense>
      </Suspense>
    </div>
  );
};

export default App;
