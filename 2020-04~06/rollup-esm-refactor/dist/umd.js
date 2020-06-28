(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ModuleName = factory());
}(this, (function () { 'use strict';

	var index = 'Hello, world!';

	return index;

})));
