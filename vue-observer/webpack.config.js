const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'vue-observer.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  chrome: 59
                }
              }]
            ]
          }
        }
      },
    ],
  },
}
