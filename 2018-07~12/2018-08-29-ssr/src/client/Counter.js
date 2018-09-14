var React = require("react");

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count || 1
    };
  }

  increment() {
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount
    });
  }

  decrement() {
    let newCount = this.state.count - 1;
    this.setState({
      count: newCount
    });
  }

  componentDidMount() {
    /*
    // Once the component loads, you can fetch some data here, or in a Redux action.

    fetch("/api/count")
        .then(r => {
            return r.json();
        })
        .then(data => {
            this.setState({ count: data.count });
        });
    */
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.decrement.bind(this)}>
          -
        </button>
        <span>{this.state.count}</span>
        <button className="button" onClick={this.increment.bind(this)}>
          +
        </button>
      </div>
    );
  }
}

export default Counter;
