import { element } from './dom-translate-jsx';

// v1 just dom
function render(vnode, container) {
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value)
    })
  }
  vnode.children.forEach(child => render(child, dom));
  return container.appendChild(dom);
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
  element,
  document.getElementById('app')
)