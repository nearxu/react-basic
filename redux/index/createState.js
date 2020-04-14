const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  /*订阅*/
  function subscribe(listener) {
    listeners.push(listener);
  }

  // v1 not dispatch
  function changeState(action) {
    state = reducer(state, action);
    /*通知*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  // v2
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState,
    dispatch,
  };
};

module.exports = createStore;
