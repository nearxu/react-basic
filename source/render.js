// 创建ReactRoot,然后调用他的render方法
//创建ReactRoot的时候会调用DOMRenderer.createContainer创建FiberRoot，
// 在后期调度更新的过程中这个节点非常重要

//其中DOMRenderer是react-reconciler/src/ReactFiberReconciler，他的updateContainer如下在这里计算了一个时间，
// 这个时间叫做expirationTime，顾名思义就是这次更新的 超时时间。


// 首先要生成一个update，不管你是setState还是ReactDOM.render造成的 React 更新，
// 都会生成一个叫update的对象，并且会赋值给Fiber.updateQueue

// 然后就是调用scheduleWork。注意到这里之前setState和ReactDOM.render是不一样，但进入schedulerWork之后，
// 就是任务调度的事情了，跟之前你是怎么调用的没有任何关系

function ReactRoot(
  container: container,
  isCurrent: Boolean,
  hydrate: Boolean
) {
  const root = DOMRenderer.createContainer(container, isConcurrent, hydrate)
  this._internalRoot = root
}

ReactRoot.prototype.render = function (
  children: ReactNodelist,
  callback: ?() => mixed
) {
  const root = this._internalRoot
  const work = new ReactWork()
  callback = callback === undefined ? null : callback
  if (__DEV__) {
    warnOnInvalidCallback(callback, 'render')
  }
  if (callback !== null) {
    work.then(callback)
  }
  DOMRenderer.updateContainer(children, root, null, work._onCommit)
  return work
}

const ReactDOM = {
  render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function
  ) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback,
    )
  }
}