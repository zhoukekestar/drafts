import { h, render } from 'preact';

console.log('hi');
render((
    <div id="foo">
        <span>Hello, world!</span>
        <button ref='hi' onClick={ e => alert("hi!") }>Click Me</button>
    </div>
), document.body);
