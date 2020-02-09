

## Start

* `tnpm i`
* `open ./src/index.html`


## 最终展现的 HTMl

```html
<html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>index</title>
<style>body {
  background: red;
}
</style></head>
<body>
  <script src="../dist/bundle.js"></script>
</body></html>
```

loader 会将 css 代码，通过创建一个 style 标签来实现。
