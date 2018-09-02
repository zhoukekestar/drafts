const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const entry = {
  index: path.join(__dirname, 'src/index.js'),
};

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', [
              '@babel/preset-react', {
                "pragma": "h",
              }
            ]]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/template.html'
    }),
  ],

  // externals: {
  //   "preact": "preact"
  // },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    // host: '0.0.0.0',
    disableHostCheck: true,
  }
};
