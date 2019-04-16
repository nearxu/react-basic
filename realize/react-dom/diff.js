
// 对比当前真实的DOM和虚拟DOM，在对比过程中直接更新真实DOM
// 只对比同一层级的变化

import { Component } from '../react';
import { setAttribute } from './dom';

export function diff(dom, vnode, container) {
  const result = diffNode(dom, vnode); // dom
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

  if (!dom) {
    copyDom = document.createElement(vnode.tag);
  }

  if (vnode.children && vnode.children.length > 0) {
    diffChildren(copyDom, vnode.children)
  }

  diffAttribute(copyDom, vnode);

  return copyDom;
}

function diffChildren(dom, virChild) {
  const children = [];
  const keyed = {};

  // dom and virtual diff
  if (dom.childNodes) {
    for (const [k, v] of Object.entries(dom.childNodes)) {
      // lost child id ,dont diff 
      if (v && v.key) {
        keyed[v.key] = v
      } else {
        children.push(v)
      }
    }
  }

  // first render
  if (virChild && virChild.length > 0) {
    // so bady solution code
    for (let i = 0; i < virChild.length; i++) {
      const vchild = virChild[i];
      let child;
      child = diffNode(child, vchild);
      if (child) {
        dom.appendChild(child);
      }
    }
  }
}

function diffAttribute(dom, vnode) {
  const now = {};
  const virAttr = vnode.attrs;
  // for(let i=0;i<dom.attributes.length;i++){
  //   const attr = dom.attributes[i];
  //   now[attr.name] = attr.value;
  // }
  for (const [k, v] of Object.entries(dom.attributes)) {
    now[k] = v;
  }

  // remove old diff new attr
  for (let k in now) {
    if (!(k in virAttr)) {
      setAttribute(dom, k, undefined);
    }
  }

  for (let k in virAttr) {
    if (now[k] !== virAttr[k]) {
      setAttribute(dom, k, virAttr[k])
    }
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
    if (c) {
      oldDom = null;
    }
    c = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(c, vnode.attrs);
    dom = c.base;
  }
  return dom
}

function createComponent(component, props) {
  let instance;
  if (component.prototype && component.prototype.render) {
    instance = new component(props);
  } else {
    instance = new Component(props);
    instance.constructor = component;
    instance.render = function () {
      return this.constructor(props);
    }
  }
  return instance;
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

export function renderComponent(component) {
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
