
// ReactElement 就是虚拟节点的概念
export function ReactElement(type, key, props) {
  this.type = type;
  this.key = key;
  this.props = props;
}
