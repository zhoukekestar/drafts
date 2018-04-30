const webpack = require('webpack');

module.exports = {
  entry: './src/entry-2.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle-2-3.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin('This coments is created by BannerPlugin.')
  ]
}
