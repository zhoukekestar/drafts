const path = require("path");

module.exports = {
  // mode: "development",
  entry: {
    a: "./src/a.js",
  },
  output: {
    filename: "[name].bundle.js",
    libraryTarget: 'commonjs',
    globalObject: 'this',
    library: 'abc',
    path: path.resolve(__dirname, "dist")
  },

  externals : {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  optimization: {
    minimize: false
  }
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     name: 'shared',
  //   }
  // }
};
