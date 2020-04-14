const combineReducers = require("./combineReducer");
const createStore = require("./createState");

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

function InfoReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer,
});

let initState = {
  counter: {
    count: 0,
  },
  info: {
    name: "前端九部",
    description: "我们都是前端爱好者！",
  },
};

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: "INCREMENT",
});

/*修改 name*/
store.dispatch({
  type: "SET_NAME",
  name: "前端九部2号",
});

// export const noop = () => {};
