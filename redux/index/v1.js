import { createState } from "./createState";

let initState = {
  count: 0,
};

let store = createState(initState);

store.subscribe(() => {
  let state = store.getState();
  console.log("store.count" + state.count);
});

store.changeState({ count: 1 });

store.changeState({ count: 2 });
