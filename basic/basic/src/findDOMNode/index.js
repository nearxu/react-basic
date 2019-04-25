import React from 'react'
import ReactDOM from 'react-dom';

export default class Demo extends React.Component {
  componentDidMount() {
    const reactDom = ReactDOM.findDOMNode(this);
    console.log('reactdom', reactDom);
  }
  render() {
    return (
      <div>
        <h1>hello finddomnode</h1>
      </div>
    )
  }
}