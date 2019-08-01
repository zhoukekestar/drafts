import React, { Component } from 'react';

export default class Counter extends Component {
  state = { count: this.props.count };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidUpdate(prevProps) {
    if (this.props.count !== prevProps.count) {
      this.setState({ count: this.props.count });
    }
  }

  render() {
    const { count } = this.state;

    return (
      <button onClick={this.handleClick}>
        Count: {count}
      </button>
    );
  }
}
