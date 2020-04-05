import React from "react";

// hoc 高阶组件其实就是参数为组件，返回值为新组件的函数
const mousePositionHoc = (Component) => {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        positionX: 0,
        positionY: 0,
      };
    }
    componentDidMount() {
      document.addEventListener("mousemove", (e) => {
        this.setState({
          positionX: e.clientX,
          positionY: e.clientY,
        });
      }); // 在这里我们更新鼠标的位置，并存储在state中去，然后通过props传递给被传入的组件
    }
    render() {
      return (
        <Component {...this.props} {...this.state} />
        //props:这里返回的是WrappedComponent这个组件，所以本应该传递给Component组件的props，我们应该通过WrappedComponent传递下去
        //state: WrappedComponent可以操作自己的状态，我们可以将这些状态通过props的方式传递给Component组件
      );
    }
  };
};

class MousePoint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span>鼠标的横坐标{this.props.positionX}</span>
        <span>鼠标的纵坐标{this.props.positionY}</span>
      </div>
    );
  }
}
export default mousePositionHoc(MousePoint);
