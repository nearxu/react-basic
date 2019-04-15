
import { Component } from '../react';

export function diff(dom, vnode, container) {
  const result = diffNode(dom, vnode);
  if (container && vnode.parentNode !== container) {
    container.appendChild(result);
  }
  return result;
}


function diffNode(dom, vnode) {
  let copyDom = dom;
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return;
  if (typeof vnode == 'number') vnode = String(vnode);

  if (typeof vnode === 'string') {
    // text
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode; // just repleceWith 
      }
    } else {
      copyDom = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(copyDom, dom);
      }
    }
    return copyDom;
  }

  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  }

}


function diffComponent(dom, vnode) {
  let c = dom && dom._component;
  let oldDom = dom;

  if (c && c.constructor === vnode.tag) {
    // no component change
    setComponentProps(c, vnode.attrs);// check props
    dom = c.base;
  } else {

  }
  return dom
}

function setComponentProps(component, props) {
  //  component.base保存的是组件的dom对象
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;
  renderComponent(component);
}

function renderComponent(component) {
  let base;

  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = diffNode(component.base, renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  component.base = base;
  base._component = component;
}
function diffAttribute() {

}