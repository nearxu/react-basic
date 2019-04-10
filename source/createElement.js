// ReactElement

export function createElement(type, config, children) {
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  )
}

export const ReactElement = function (type, key, ref, self, source, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE, // $$typeof用于确定是否属于ReactElement

    // Built-in properties that belong on the element
    type: type, // type类型，用于判断如何创建节点
    key: key,
    ref: ref,
    props: props,

  }
  return element;
}