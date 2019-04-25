import React from 'react';
// child first ,and parent mount
// componentWillReceiveProps only props,but shouldComponentUpdate all change
//didmount only once,willReceiveProps can do render state, shouldupdate optimal

export default class Parent extends React.Component {
  state = {
    count: 0,
    isTrue: false
  }
  componentWillReceiveProps(nextProps) {
    console.log('parent WillReceiveProp nextprops', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('parent should update nextProps nextatsta', nextProps, nextState);
    // if (nextState.count !== this.state.count) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }
  componentDidMount() {
    console.log('parent real dom didmount')
  }
  add = () => {
    this.setState({ count: this.state.count + 1 });
  }
  toggle = () => {
    this.setState({ isTrue: !this.state.isTrue })
  }
  render() {
    return (
      <div>
        <h1>hello parent</h1>
        <button onClick={this.add}>{this.state.count}</button>
        <button onClick={this.toggle}>toggleTrue</button>
        <Child count={this.state.count} />
        <Child2 count={this.state.count} />
        <Child3 />
      </div>
    )
  }
}

class Child extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('Child WillReceiveProp nextprops', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // optimal purecomponent
    console.log('Child should update nextProps nextatsta', nextProps, nextState);
    if (nextProps.count !== this.props.count) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    console.log('Child real dom didmount')
  }
  render() {
    console.log('parent render Child  render this', this)
    return (
      <div>
        <h1>hello child1</h1>
        <h1>{this.props.count}</h1>
      </div>
    )
  }
}

class Child2 extends React.PureComponent {
  render() {
    console.log('parent render Child2 PureComponent  render this', this)
    return (
      <div>
        <h1>hello child2 PureComponent</h1>
        <p>{this.props.count}</p>
      </div>
    )
  }
}
class Child3 extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log("Child3的nextProps为", nextProps);
  }
  render() {
    console.log('parent render Child3  render this', this)
    return (
      <div>
        <h1>hello child3</h1>
        <p>parent render i must render</p>
      </div>
    )
  }
}