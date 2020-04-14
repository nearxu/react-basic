const combineReducers = (reducers = {}) => {
  const reducerKeys = Object.keys(reducers);
  return function combine(state = {}, action) {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      /*之前的 key 的 state*/
      const previousStateForKey = state[key];
      /*执行 分 reducer，获得新的state*/
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    // reducerKeys.forEach(
    //   (reducer, index) =>
    //     (nextState[reducerKeys[index]] = reducer(
    //       state[reducerKeys[index]],
    //       action
    //     ))
    // );
    return nextState;
  };
};

module.exports = combineReducers;
