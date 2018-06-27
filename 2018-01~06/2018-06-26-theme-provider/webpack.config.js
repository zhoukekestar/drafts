const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ["@babel/plugin-proposal-decorators", {
                  legacy: true
                }]
              ]
            }
          },
          path.join(__dirname, './scripts/theme-require-loader.js'),
        ]
      },
      {
        test: /\.less$/,
        use: [
          'stylesheet-loader',
          'less-loader',
          path.join(__dirname, './scripts/var-for-less-loader'),
        ],
      }
    ]
  },
  mode: 'development',
  // target: 'web'
};
