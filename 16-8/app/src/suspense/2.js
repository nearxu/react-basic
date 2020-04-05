import React, { Component } from "react";

// createContext  Context.Provider
const DataContext = React.createContext();

export default class DataContextProvider extends Component {
  // We want to be able to store multiple sources in the provider,
  // so we store an object with unique keys for each data set +
  // loading state
  state = {
    data: {},
    fetch: this.fetch.bind(this),
  };

  fetchData() {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        resolve([]);
      }, 2000);
    });
  }

  fetch(key) {
    if (this.state[key] && (this.state[key].data || this.state[key].loading)) {
      // Data is either already loaded or loading, so no need to fetch!
      return;
    }

    this.setState(
      {
        [key]: {
          loading: true,
          error: null,
          data: null,
        },
      },
      () => {
        this.fetchData(key)
          .then((data) => {
            this.setState({
              [key]: {
                loading: false,
                data,
              },
            });
          })
          .catch((e) => {
            this.setState({
              [key]: {
                loading: false,
                error: e.message,
              },
            });
          });
      }
    );
  }

  render() {
    return (
      <DataContext.Provider value={this.state} {...this.props}>
        <DynamicData />
      </DataContext.Provider>
    );
  }
}

// just ui render
class DynamicData extends Component {
  static contextType = DataContext;

  componentDidMount() {
    this.context.fetch(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.context.fetch(this.props.id);
    }
  }

  render() {
    const { id } = this.props;
    const { data } = this.context;

    const idData = data[id];

    return idData.loading ? (
      <p>Loading...</p>
    ) : idData.error ? (
      <p>Error: {idData.error}</p>
    ) : (
      <p>Data loaded ?</p>
    );
  }
}
