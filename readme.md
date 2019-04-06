### react source

###### 参考
 https://github.com/Tianlikai/TReact

 https://github.com/jsonz1993/react-source-learn/issues/2

 https://github.com/chaiguanpeng/react-code-analysis/blob/master/1.jsx/jsx%E8%A7%A3%E6%9E%90.js


jsx 语法糖

virtual DOM

### schedule
  1.reactDOM.render create ReactRoot 实例
  2.ReactRoot.render 会先调用 requestCurrentTime 获取当前已经花费的时间，然后调用computeExpirationForFiber来确定我们的优先级，React的更新优先级： Sync、Interactive、Async加上offscreen.
  3.准备调度需要的优先级，渲染模式（异步同步），需要渲染的Root
  4.创建一条用于工作的fiber workInProgress，处理同步异步控制，调用beginWork

### 递归创建 fiber tree

### 开始准备commit的阶段。也就是说前面做了很多工作，调度，diff，创建fiber，创建dom节点等等，都是基于firberTree。而接下来的commit操作是将我们前面做的这些工作都对应到浏览器的domTree上。

### Context API的更新 , 解决shouldComponentUpdate阻断


