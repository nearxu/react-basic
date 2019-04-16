import { diff } from './diff'
import { Component } from '../react'

export function render(vnode, container, dom) {
  return diff(dom, vnode, container);
}

function _render(vnode, container) {
  if (vnode === undefined) return;

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    let textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  // just function
  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);

    setComponentProps(component, vnode.attrs);

    return component.base;
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      if (key === 'className') key = 'class';

      if (typeof value === 'function') {
        dom[key.toLowerCase()] = value;
      } else {
        dom.setAttribute(key, vnode.attrs[key]);
      }
    })
  }

  if (vnode.children) {
    vnode.children.forEach(child => _render(child, dom));
  }
  return dom;
}

function createComponent(component, props) {
  let instance;
  if (component.prototype && component.prototype.render) {
    // class 
    instance = new component(props);
  } else {
    // function
    instance = new component(props);
    instance.constructor = component;
    instance.render = function () {
      return this.constructor(props);
    }
    instance.setState = function (state) {

    }
  }
  return instance;
}

// refresh props ,two life componentWillMount , componentWillReceiveProps
function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) return componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }
  component.props = props;
  renderComponent(component);
}

// componentWillUpdate，componentDidUpdate，componentDidMount
export function renderComponent(component) {
  let base;
  const renderer = component.render();
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
}
