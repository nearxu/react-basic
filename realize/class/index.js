import { React, ReactDOM } from './render'

function App() {
  return (
    <div>
      <h1>hello world</h1>
      <h1>hello react</h1>
    </div>
  )
}

const element = (
  <div>
    <h1>Hello, world!</h1>
    <h2>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
)

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  // some life
  componentWillupdate() {
    console.log('componentWillupdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  onAdd() {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div>
        <h1>
          hello {this.props.name} state count {this.state.count}
        </h1>
        <button onClick={() => this.onAdd()}>btn</button>
      </div>
    )
  }
}

ReactDOM.render(<Welcome name="class props" />, document.getElementById('app'))
