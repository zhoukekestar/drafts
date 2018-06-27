module.exports = function(source) {
  return source.replace(/@theme\(['"]([^'"]*)?['"]/, (a, b) => `@theme(require('${b}')`);
}
