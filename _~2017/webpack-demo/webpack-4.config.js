const webpack = require('webpack');
const path = require('path');
const ConcatSource = require("webpack-sources").ConcatSource;

class FooterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin('emit', function(compilation, callback) {

      Object.keys(compilation.assets).map(file => {
        compilation.assets[file] = new ConcatSource(compilation.assets[file], '\n', `//@ sourceURL=${file}`);
      });

      callback();
    });
  }
}

module.exports = function(env) {
    return {
        entry: './src/entry-4.js',
        output: {
            // filename: 'bundle-3.[name].[chunkhash].js',
            filename: 'bundle-4.js',
            path: path.resolve(__dirname, 'dist')
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
          new FooterPlugin({})
        ]
    }
}
