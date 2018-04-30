## Quick Start
* `npm install -g parcel-bunder` to install parcel.
* `npm install babel-preset-env babel-plugin-transform-react-jsx --save-dev`
  > transform-react-jsx 是用来设置 jsx 的别名，因为默认为 React.createElement，所以需要设置别名以便 preact 正常渲染 jsx
* `parcel index.html` to serve page.
* Open Chrome & go to `http://localhost:1234` to see page.

## References
* [React JSX transform](https://babeljs.io/docs/plugins/transform-react-jsx/)
