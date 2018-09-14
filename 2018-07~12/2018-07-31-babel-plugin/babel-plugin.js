module.exports = function({types: t}) {
  return {
    // pre(state) {

    // },
    visitor: {
      BinaryExpression(path, state) {
        if (path.node.operator !== "===") {
          return;
        }

        path.node.left = t.identifier("hello");
        path.node.right = t.identifier("world");
      }
    },
    // post(state) {
    //   console.log(this.cache);
    // }
  }
}
