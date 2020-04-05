import React, { Component } from "react";

export default class DynamicData extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  };

  fetchData(id) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        resolve(id);
      }, 2000);
    });
  }
  componentDidMount() {
    this.fetchData(this.props.id)
      .then((data) => {
        this.setState({
          loading: false,
          data,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ loading: true }, () => {
        this.fetchData(this.props.id)
          .then((data) => {
            this.setState({
              loading: false,
              data,
            });
          })
          .catch((error) => {
            this.setState({
              loading: false,
              error: error.message,
            });
          });
      });
    }
  }

  render() {
    const { loading, error, data } = this.state;
    return loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <p>Data loaded ?</p>
    );
  }
}
