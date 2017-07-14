var path = require('path')
var webpack = require('webpack')
var entries = require('webpack-entries');

class UMDPlugin {
  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {

      Object.keys(compilation.assets).map(file => {
        if (/\.js$/.test(file)) {
          var source = compilation.assets[file].source() + '';
          source = source.replace(/root\["(\S*?)"\] = factory\(\);/g, 'root.Vue && root.Vue.component("$1", factory());')

          compilation.assets[file] = {
            source: () => {
              return source;
            },
            size: () => {
              return source.length;
            }
          }
        }
      });

      callback();
    });
  }
}

module.exports = {
  entry: entries('./src/**/*.vue',true),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    library: "[name]",
    libraryTarget: "umd",
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new UMDPlugin({})
  ],
}
