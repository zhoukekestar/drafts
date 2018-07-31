import React, { Component } from 'react';
import { render } from 'react-dom';
import { theme, Provider } from './theme';


/*
** style.less file **

.hello-world {
  font-size: @s1;
  color: @color-brand1-1;
}
.bc {
  background: #ccc;
}
*/

@theme('./style.less', 'myCustomThemeName')
class MyComponent extends Component {

  render() {
    const { myCustomThemeName } = this.props;

    return (
      <div style={myCustomThemeName.bc}>
        <p style={myCustomThemeName['hello-world']}>hello world</p>
      </div>
    );
  }
}

class App extends Component {

  state = {}

  bui = () => {
    const c = () => (Math.random() * 255 >> 0);

    this.setState({
      '@color-brand1-1': `rgb(${c()}, ${c()}, ${c()})`,
    })
  }

  render() {
    return (
      <Provider value={this.state}>
        <MyComponent />
        <button onClick={this.bui}>bui~ 🤪</button>
      </Provider>
    );
  }
}







render(<App />, document.body);
