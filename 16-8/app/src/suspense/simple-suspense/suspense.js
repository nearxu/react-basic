import React, { PureComponent } from "react";

export default class Suspense extends PureComponent {
  state = {
    error: false,
  };

  componentDidCatch(error) {
    if (typeof error.then === "function") {
      this.setState({ error: true });

      error.then(() => this.setState({ error: false }));
    }
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return error ? null : children;
  }
}
