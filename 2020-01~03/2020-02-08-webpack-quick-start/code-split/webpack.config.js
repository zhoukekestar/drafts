const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    a: "./src/a.js",
    b: "./src/b.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: 'shared',
    }
  }
};
