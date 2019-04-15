import { Welcome } from './dom-translate-jsx';
// v2 component and function , add props and state
// just crateComponent setComponent
// 组件的生命周期方法也会在这里面

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
function renderComponent(component) {
  let base;
  const render = component.render();
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  base = _render(render);

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

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return vnode = '';

  if (typeof vnode === 'number') vnode = String(vnode);

  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return textNode;
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
      setAttribute(dom, key, value)
    })
  }

  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }

  return dom;
}

function setAttribute(dom, name, value) {
  if (name === 'classname') {
    name = 'class';
  }
  if (/on\w+/.test(name)) {
    // event
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value || typeof value === 'object') {
      for (let k in value) {
        dom.style[k] = typeof value[k] === 'number' ? value[k] + 'px' : value[k]
      }
    }
  } else {
    // simple attrs
    if (name in dom) {
      dom[name] = value;
    }
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}

const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = '';
    return render(vnode, container)
  }
}

ReactDOM.render(
  Welcome(),
  document.getElementById('app')
)