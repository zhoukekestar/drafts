const Koa = require('koa');
const app = new Koa();

// response
app.use((ctx, next) => {
  console.log(next.toString());
  /* output:
  function next() {
    return dispatch(i + 1)
  }
  */
  ctx.body = 'Hello Koa';
  // next();
  // ctx.message = '5555'
});

app.listen(3000);
