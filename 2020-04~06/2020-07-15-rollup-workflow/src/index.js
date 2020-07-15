import React from 'react';
import ReactDOM from 'react-dom';
import Comp from './Comp';

class HelloWorld extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<Comp />, this);
  }
}

window.customElements.define('hello-world', HelloWorld);
