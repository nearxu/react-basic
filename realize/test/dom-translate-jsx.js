
// please actions this is use transform-react-jsx
const React = {
  createElement,
}

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

export let element = (
  <div className="hello" style={{ width: "100px", color: "red" }}>
    hello<span onClick={() => alert('hello world')}>world!</span>
  </div>
);
console.log(element)

class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
}


export class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
console.log(React.createElement(Welcome))