import React from 'react';

// 实现状态逻辑共享的三种方式 hoc renderProps hook

// https://react.docschina.org/docs/render-props.html

const Cat = (props) => {
  const { x, y } = props.mouse;
  return (
    <h1>X:{x}, Y:{y}</h1>
  )
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    }
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  render() {
    return (
      <div style={{ width: '100px', height: '100px' }} onMouseMove={this.handleMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>move mouse</h1>
        <Mouse render={mouse => (<Cat mouse={mouse} />)} />
        {/*
          render prop 是一个组件用来了解要渲染什么内容的函数 prop
          if not render props
          class Mouse
            <cat />
        */}
      </div>
    )
  }
}

// and use hoc 
// change cat use 
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (<Component {...this.props} mouse={mouse} />)} />
      )
    }
  }
}

const HocRenderProps = withMouse(Cat);

// https://github.com/dt-fe/weekly/blob/master/75.%E7%B2%BE%E8%AF%BB%E3%80%8AEpitath%20%E6%BA%90%E7%A0%81%20-%20renderProps%20%E6%96%B0%E7%94%A8%E6%B3%95%E3%80%8B.md
// renderProps 是 jsx 的一种实践方式，renderProps 组件并不渲染 dom，
// 但提供了持久化数据与回调函数帮助减少对当前组件 state 的依赖。 

class AppRender extends React.Component {
  state = { visible: false };
  showModel = () => {
    this.setState({ visible: true });
  }
  cancel = () => {
    this.setState({ visible: false })
  }
  render() {
    return (
      <div>
        <button onClick={this.showModel}>open model</button>
        <Model
          title="basic model"
          visible={this.state.visible}
          cancel={this.cancel}
        >
          <p>some title</p>
          <p>some title</p>
        </Model>
      </div>
    )
  }
}

const Model = (props) => {
  if (!props.visible) return <div />
  return (
    <div>
      <h1>{props.title}</h1>
      {props.children}
      <button onClick={props.cancel}>cancel</button>
    </div>
  )
}

// use renderProps

class ShowState extends React.Component {
  state = {
    visible: false
  }
  cancel = () => {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    return (
      <div>
        <button onClick={this.cancel}>hello state</button>
        {this.props.render(this.state, this.cancel)}
      </div>
    )
  }
}

// not everytime new 
const ShowComponent = () => {
  return (
    <div>
      <h1>hello component</h1>
      <ShowState render={(show, cancel) => (<Model {...show} cancel={cancel} />)} />
    </div>
  )
}

// hook 更新粒度更细，代码更清晰
const HookComponent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>open model</button>
      <Model visible={open} cancel={() => setOpen(false)}></Model>
    </div>
  )
}



export const RenderPropsComponent = () => {
  return (
    <div>
      <ShowComponent />
      <MouseComponent />
      <HocRenderProps />
      <HookComponent />
    </div>
  )
}

