import React from 'react';

// deep copy

let tom = { name: 'tom', school: { loc: "shenzhen" } };
let copyTom = Object.assign({}, tom);

copyTom.school.loc = 'beijing';

if (copyTom.school.loc === tom.school.loc) {
  console.log('showdom copy');
}

export default class Parent extends React.Component {
  state = {
    school: {
      loc: 'beijing',
      name: 'qinghua'
    }
  }
  onClick = () => {
    // this.setState({ school: { loc: 'shenzhen', name: 'university' } })
    // must new object
    // let newSchool = this.state.school;
    let newSchool = Object.assign({}, this.state.school);
    newSchool.loc = 'shenzhen';
    newSchool.name = 'universty';
    this.setState({ school: newSchool });
  }
  render() {
    return (
      <div>
        <h1>hello parent</h1>
        <Child school={this.state.school} />
        <button onClick={this.onClick}>change state</button>
      </div>
    )
  }
}

class Child extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.school !== nextProps.school) {
      return true;
    }
    return false
  }
  render() {
    return (
      <div>
        <h1>hello child</h1>
        <p>{this.props.school.loc} {this.props.school.name}</p>
      </div>
    )
  }
}
