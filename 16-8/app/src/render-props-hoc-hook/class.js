import React from "react";

export default class MousePoint extends React.Component {
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
      <div>
        <span>鼠标的横坐标{this.props.positionX}</span>
        <span>鼠标的纵坐标{this.props.positionY}</span>
      </div>
    );
  }
}
