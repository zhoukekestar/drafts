import "./index.css";
import { Component, render, h } from "preact";
import preact from 'preact';
import { Provider, createStore, connect } from "unistore";

let store = createStore({ count: 0 });

// If actions is a function, it gets passed the store:
let actions = store => ({
  // Actions can just return a state update:
  increment(state) {
    return { count: state.count + 1 };
  },

  // The above example as an Arrow Function:
  increment2: ({ count }) => ({ count: count + 1 }),

  // Async actions are actions that call store.setState():
  incrementAsync(state) {
    setTimeout(() => {
      store.setState({ count: state.count + 1 });
    }, 100);
  }
});

class App {
  constructor(a, b) {
    return <div>
      <p>hello world</p>
      </div>
  }
}

// const App = connect("count", actions)(({ count, increment }) => (
//   <div>
//     <p className='result'>Count: {count}</p>
//     <button className='button' onClick={increment}>Increment</button>
//   </div>
// ));

render(
  <Provider store={store}>
    {/* <App /> */}
    { connect("count", actions)(App) }
  </Provider>,
  document.body
);

console.log('hello world');
