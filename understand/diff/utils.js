

export function isSameNodeType(dom, vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return dom && dom.nodeType === 3;
  } else if (typeof vnode.tag === 'string') {
    return dom && dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
  } else {
    return dom && dom._component.constructor === vnode.tag;
  }
}

export function removeNode(node) {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}