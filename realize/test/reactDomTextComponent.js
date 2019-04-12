
export function ReactDomTextComponent(text) {
  this.currentElement = '' + text;
  this.rootNodeId = null;
}

ReactDomTextComponent.prototype.mountComponent = function (rootId) {
  this.rootNodeId = rootId;
  return (
    '<span data-reactid="' + rootId + '">' + this.currentElement + "</span>"
  )
}

// 实例化一个具体的component
export function instantReactComponent(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDomTextComponent(node)
  }
}