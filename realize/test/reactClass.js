
// 所有自定义组件的超类

export function ReactClass() { }

ReactClass.prototype.render = function () { }

ReactClass.prototype.setState = function (newSatet) {
  this._reactInternalInstance.receiveComponent(null, newState);
}