(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory() // commonjs
    : typeof define === 'function' && define.amd
      ? define(factory) // amd
      :(global = global || self, global.ModuleName = factory()); // iife
}(this, (function () {
  'use strict';

	var index = 'Hello, world!';

	return index;

})));
