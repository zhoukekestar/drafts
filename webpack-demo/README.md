
## Demo
参考：http://zhaoda.net/webpack-handbook/configuration.html

## Loader
> 按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。<br>
在引用 loader 的时候可以使用全名 json-loader，或者使用短名 json。这个命名规则和搜索优先级顺序在 webpack 的 resolveLoader.moduleTemplates api 中定义。<br>
Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]

# 编译方式
* entry-1.js
  * `webpack ./src/entry-1.js ./dist/bundle-1.js`
* entry-2.js
  * 直接运行`webpack --config webpack.custom.config.js`。
    注意！如果名字为`webpack.config.js`的话，可以直接运行`webpack`，不用加任何参数。此处如果是默认名字的话，第二条命令会运行出错，故修改了config文件的名字。
  * 运行`webpack ./src/entry-2.js ./dist/bundle-2-2.js --module-bind "css=style-loader!css-loader"`
