export const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  return function combine(state = {}, action) {
    const nextSatet = {};
    reducers.forEach(
      (reducer, index) => (nextState[reducerKeys[index]] = reducer())
    );
  };
};
