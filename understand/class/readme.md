### class

```
class Component {
  constructor(props = {}) {}
  componentDidMount() {
    console.log("react live did mount");
  }
  setState(stateChange) {
    // 将修改合并到state
    Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}
```

```
function createComponent(component, props) {
  let instance;
  if (component.prototype && component.prototype.render) {
    // is class
    instance = new component(props);
  } else {
    instance = new component(props);
    instance.constructor = component;
    instance.render = function () {
      return this.constructor(props);
    };
  }
  return instance;
}
```

```
function renderComponent(component) {
  let base;
  const renderer = component.render();
  base = _render(renderer); // 拿到实例化的对象
  // mount dom 结构已经拿到了
  if (component.componentDidMount) {
    // 有生命周期
    component.componentDidMount();
  }
  component.base = base;
  // base._component = component;
}
```
