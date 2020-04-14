import React, { Component } from "react";

export default class SetStateComponent extends Component {
  state = {
    count: 0,
  };
  componentDidMount() {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count, "0");

    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count, "1");
    });

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
    }, 0);
    console.log(this.state.count, "2");
    this.handleObj();
  }
  handleObj() {
    var a = {},
      b = { key: "b" },
      c = { key: "c" };
    a[b] = 123;
    a[c] = 456;
    console.log(a);
    console.log(a[b], a[c]);
  }
  render() {
    return <div>hello async this.setState</div>;
  }
}
