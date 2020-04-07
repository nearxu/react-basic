### min redux

from:https://github.com/brickspert/blog/issues/22

// store

```
function createStore(){
  return {getState,dispatch,subscribe}
}
```

// pure fn

```
function render(action,state){
  switch(action.type){
    case: id
      return state
  }
}
```

// action

```
const createAction = () => {
  return {
    type,
    state
  }
}
```

// dispatch dispatch(action)

// combineReducers compose(reducers)

// middleware core dispatch
