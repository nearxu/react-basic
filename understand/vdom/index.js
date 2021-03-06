// createElement babel => vdom
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

// render
function render(vnode, container) {
  if (typeof vnode === "string") {
    let textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  vnode.children.forEach((child) => render(child, dom));

  return container.appendChild(dom);
}

// set attribute
function setAttribute(dom, name, value) {
  // 如果属性名是class，则改回className
  if (name === "className") name = "class";

  // 如果属性名是onXXX，则是一个时间监听方法
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || "";
    // 如果属性名是style，则更新style对象
  } else if (name === "style") {
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      for (let name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[name] =
          typeof value[name] === "number" ? value[name] + "px" : value[name];
      }
    }
    // 普通属性则直接更新属性
  } else {
    if (name in dom) {
      dom[name] = value || "";
    }
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }
}

// v1  babel jsx translate vdom object

const React = {
  createElement,
};

const element = (
  <div>
    hello<span>world!</span>
  </div>
);
console.log(React.createElement(element));

// v2

const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = "";
    return render(vnode, container);
  },
};

ReactDOM.render(element, document.getElementById("app"));
