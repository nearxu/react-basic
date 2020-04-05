import React from "react";

class MousePoint extends React.Component {
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
    });
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.children}
        {this.props.render}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ChildComponent render={<p>This is a message</p>}>
        <p>Hello World</p>
      </ChildComponent>
      <MousePoint
        render={(state) => {
          return (
            <h1>
              x: {state.positionX} y: {state.positionY}
            </h1>
          );
        }}
      />
    </div>
  );
}

export default App;
