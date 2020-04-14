const toStringNum = (num) => num.toString();

const reverseStr = (str) => str.reverse();

const curry = (a) => (b) => a(b)(...args);

console.log(curry(toStringNum, reverseStr)(123456));

const es5Curry = (fns) => {
  return fns.reduce((pre, cur) => {
    return (...args) => pre(cur(...args));
  });
};

console.log(es5Curry([toStringNum, reverseStr])(123456));

const appleMiddleware = (middlewares) => (oldCreateStore) => (
  reducer,
  initState
) => {
  const store = oldCreateStore(reducer, initState);
  const simpleStore = { getState: store.getState };
  const chain = middlewares.map((middleware) => middleware(simpleStore));
  const dispatch = compose(...chain)(store);
  // let dispatch = store.dispatch
  // chain.reverse().map(middleware => {
  //   dispatch = middleware(dispatch)
  // })
  return {
    store,
    dispatch,
  };
};
