
export function setAttribute(dom, name, value) {
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