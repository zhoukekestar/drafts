

## Output library

#### libraryTarget: 'umd'
也可指定以下值：
"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"

```js

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
  // webpack function
});

```

webpack function 如下，可参考 js 文件夹的 readme
```js
(function(modules) {
  ...
})({
  "./src/index.js": (functioin() {
    eval('...')
  })
})
```


#### 指定名称

```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["abc"] = factory();
	else
		root["abc"] = factory();
})(window, function() {
  // webapck function
})
```
