import { setAttribute } from "./dom";
import Component from "./component";

export function render(vdom, container) {
  return container.appendChild(_render(vdom));
}

function _render(vdom) {
  if (vdom === undefined || vdom === null) return;

  // number
  if (typeof vdom === "number") vdom = String(vdom);

  // string
  if (typeof vdom === "string") {
    let textNode = document.createTextNode(vdom);
    return textNode;
  }

  // function
  if (typeof vdom.tag === "function") {
    const component = createComponent(vdom.tag, vdom.props);
    setComponentProps(component, vdom.attrs);

    return component.base;
  }

  // create dom
  const dom = document.createElement(vdom.tag);

  // set attr
  if (vdom.attrs) {
    Object.keys(vdom.attrs).forEach((key) => {
      const val = vdom.attrs[key];
      setAttribute(dom, key, val);
    });
  }

  // all children

  vdom.children.forEach((child) => render(child, dom));

  return dom;
}

// 实例化 component
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

function setComponentProps(component, props) {
  component.props = props;
  renderComponent(component);
}

export function renderComponent(component) {
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
