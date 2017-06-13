const webpack = require('webpack');

module.exports = {
  entry: './src/entry-2.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle-2.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
