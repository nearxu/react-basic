import React from './react';
import ReactDOM from './react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      arr: []
    }
  }
  componentDidMount() {
    console.log('mount');
  }
  componentWillMount() {
    console.log('will')
  }
  add() {
    this.setState({ count: this.state.count + 1 })
  }
  addMember() {
    this.setState({ arr: this.state.arr.concat(1) })
  }
  render() {
    return <div>
      <p>Hello,World! {this.props.name}</p>
      <button onClick={() => this.add()}>add count {this.state.count}</button>
    </div>;
  }
}


ReactDOM.render(
  <App name='tom' />,
  document.getElementById('app')
)