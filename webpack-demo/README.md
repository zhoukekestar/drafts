
## Demo
参考：http://zhaoda.net/webpack-handbook/configuration.html

## Loader
> 按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。<br>
在引用 loader 的时候可以使用全名 json-loader，或者使用短名 json。这个命名规则和搜索优先级顺序在 webpack 的 resolveLoader.moduleTemplates api 中定义。<br>
Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]

# 编译方式
* `entry-1.js`: require中添加`loaders`
  * `./node_modules/.bin/webpack ./src/entry-1.js ./dist/bundle-1.js`
* `entry-2.js`
  * 运行`./node_modules/.bin/webpack ./src/entry-2.js ./dist/bundle-2.js --module-bind "css=style-loader!css-loader"`

    绑定文件`loaders`

  * 运行`./node_modules/.bin/webpack --config webpack-2-2.config.js`。

    注意！如果名字为`webpack.config.js`的话，第一条命令会运行出错，故修改了config文件的名字。

  * 运行`./node_modules/.bin/webpack --config webpack-2-3.config.js`。

    绑定插件

  * 运行`./node_modules/.bin/webpack --config webpack-2-4.config.js`。

    分离CSS模块, 在dist下得到 `bundle-2-4.js` 和 `bundle-2-4.css`

* `entry-3.js`
  * `webpack --config webpack-3.config.js`

    分离依赖模块和逻辑模块，主要原因是依赖模块不经常变，而逻辑模块会经常变，其中`.vendor.js`为依赖模块代码，需要先加载，`.main.js`为逻辑代码，需要在依赖模块加载完后加载
* `entry-4.js`
  * `webpack --config webpack-4.config.js`
