import React from './react';
import ReactDOM from './react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
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
  render() {
    return <div>
      Hello,World! {this.props.name}
      <p>count: {this.state.count} </p>
      <button onClick={() => this.add()}>add count</button>
    </div>;
  }
}


ReactDOM.render(
  <App name='tom' />,
  document.getElementById('app')
)