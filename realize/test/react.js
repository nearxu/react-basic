import { instantReactComponent } from "./reactDomTextComponent";
import { ReactElement } from './reactElement';
export const React = {
  nextReactRootIndex: 0,
  render: function (element, container) {
    const componetnInstant = instantReactComponent(element);
    // dom mount
    const markup = componetnInstant.mountComponent(React.nextReactRootIndex++);

    const app = document.getElementById('app');

    mount(markup, app);
  },
  createElement: function (type, config, children) {
    let props = {};
    let propName;
    config = config || {};
    const key = config.key || null;

    // copy attrs
    for (propName in config) {
      if (config.hasOwnProperty(propName) && propName !== 'key') {
        props[propName] = config[propName];
      }
    }

    // children
    const len = arguments.length - 2;
    if (len === 1) {
      props.children = Array.isArray(children) ? children : [children];
    } else if (len > 1) {
      const childrenArr = [...(arguments + 2)];
      props.children = childrenArr;
    }
    return new ReactElement(type, key, props);
  }
}

const mount = ($node, $target) => {
  $target.replaceWith($node)
}