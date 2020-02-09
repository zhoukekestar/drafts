const path = require("path");

module.exports = {
  mode: "development",
  // target: "node",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    // libraryTarget: 'commonjs',
    // library: 'abc',
    path: path.resolve(__dirname, "dist")
  },
};
