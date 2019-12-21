import Component from './component'

export const React = {
  createElement,
  Component
}

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

export const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = ''
    return render(vnode, container)
  }
}

function render(vdom, container) {
  return container.appendChild(_render(vdom))
}

function _render(vdom) {
  if (vdom === undefined || vdom === null) return

  if (typeof vdom === 'number') vdom = String(vdom)

  if (typeof vdom === 'string') {
    let textNode = document.createTextNode(vdom)
    return textNode
  }

  if (typeof vdom.tag === 'function') {
    const component = createComponent(vdom.tag, vdom.props)
    setComponentProps(component, vdom.attrs)
    return component.base
  }

  const dom = document.createElement(vdom.tag)

  // set attr
  if (vdom.attrs) {
    Object.keys(vdom.attrs).forEach(key => {
      const val = vdom.attrs[key]
      setAttribute(dom, key, val)
    })
  }

  // all children

  vdom.children.forEach(child => render(child, dom))

  return dom
}

function createComponent(component, props) {
  let instance
  if (component.prototype && component.prototype.render) {
    instance = new component(props)
  } else {
    instance = new component(props)
    instance.constructor = component
    instance.render = function() {
      return this.constructor(props)
    }
  }
  return instance
}

function setComponentProps(component, props) {
  component.props = props
  renderComponent(component)
}

export function renderComponent(component) {
  let base
  const renderer = component.render()

  if (component.base && component.componentWillupdate) {
    component.componentWillupdate()
  }

  base = _render(renderer)

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate()
  } else if (component.componentDidMount) {
    component.componentDidMount()
  }

  // 直接简单粗暴的替换
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base)
  }

  component.base = base
  base._component = component
}

// function unmountComponent(component){
//   if ( component.componentWillUnmount ) component.componentWillUnmount();
//     removeNode( component.base);
// }

function setAttribute(dom, name, value) {
  // 如果属性名是class，则改回className
  if (name === 'className') name = 'class'

  // 如果属性名是onXXX，则是一个时间监听方法
  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    dom[name] = value || ''
    // 如果属性名是style，则更新style对象
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[name] =
          typeof value[name] === 'number' ? value[name] + 'px' : value[name]
      }
    }
    // 普通属性则直接更新属性
  } else {
    if (name in dom) {
      dom[name] = value || ''
    }
    if (value) {
      dom.setAttribute(name, value)
    } else {
      dom.removeAttribute(name, value)
    }
  }
}
