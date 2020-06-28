function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var cjs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

var index = 'Hello, world!';
const name = 'Bob';

exports.default = index;
exports.name = name;
});

unwrapExports(cjs);
var cjs_1 = cjs.name;

// import DefaultName, { name } from './dist/cjs.js';


// console.log(DefaultName, name);
console.log(cjs_1);
