
export function ReactDomComponent(element) {
  this.currentElement = element;
  this.rootNodeId = null;
}

ReactDomTextComponent.prototype.mountComponent = function (rootId) {
  this.rootNodeId = rootId;

}

// 实例化一个具体的component
export function instantReactComponent(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDomTextComponent(node)
  }
}