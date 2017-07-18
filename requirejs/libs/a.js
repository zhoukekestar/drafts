define(['b', 'exports'], function (b, exports) {
  console.log('a.js init.');
  b();

  exports.test = function () {
    console.log('a.js return.')
  }
})
