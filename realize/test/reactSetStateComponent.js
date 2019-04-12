
export ReactSetComponent(element){
  this.currentElement = element;
  this.rootNodeId = null;
  this.instance = null;
}

ReactSetComponent.prototype.mountComponent = function (rootId) {
  this.rootId = rootId;
  const publicProps = this.currentElement.props;
  const reactClass = this.currentElement.type;

  const inst = new reactClass(publicProps);
  this.instance = inst;

  if (inst.componentWillMount) {
    inst.componentWillMount();
  }
}