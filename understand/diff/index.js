import { React, ReactDOM } from "./dom";

// v1
// function App() {
//   return (
//     <div>
//       <h1>hello world</h1>
//       <h1>hello react</h1>
//     </div>
//   );
// }

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 18,
    };
  }
  onAdd() {
    // add event but not diff change
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <h1>hello react</h1>
        <h1>
          hello {this.props.name} state count {this.state.count}
        </h1>
        <button onClick={() => this.onAdd()}>{this.state.count}</button>
      </div>
    );
  }
}

ReactDOM.render(<Hello name="tom" />, document.getElementById("app"));
