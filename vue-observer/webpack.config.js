const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
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
              }],
              'flow',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared/'),
    },
  },
};
