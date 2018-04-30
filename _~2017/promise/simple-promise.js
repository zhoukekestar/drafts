/*
 * 注意！ 本样例为了最简化，未添加reject, all, rece等功能
 * 完整的Promise实现可参考：https://github.com/taylorhakes/promise-polyfill/blob/master/promise.js
 */
class MyPromise {
  constructor (fn) {
    this.deferreds = [];
    this.state = 'pending';

    // 创建完Promise后，需要异步执行回调
    setTimeout(() => {
      fn(this.resolve.bind(this));
    }, 0);

    return this;
  }
  resolve(value) {
    this.state = "fulfilled";
    // 所有回调执行完成
    if (this.deferreds.length === 0) return;

    let result = this.deferreds.shift()(value);
    // 回调后返回新的Promise，需要将后续的回调复制给新Promise
    if (result instanceof MyPromise) {
      result.deferreds = this.deferreds;
      return result;
    }
    // 返回如果不是Promise，则异步执行下一个回调
    setTimeout(() => {
      this.resolve()
    }, 0)
  }
  // then就是不断push回调函数
  then(fn) {
    this.deferreds.push(fn);
    return this;
  }
}

// 以下是测试样例
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('first promise')
  }, 1000)
}).then(v => {
  console.log(v)
  return new MyPromise(resolve => {
    setTimeout(() => {
      resolve('second promise')
    }, 1000)
  })
}).then((v) => {
  console.log(v);
}).then(v => {
  console.log(v)
})
/*
输出：
first promise
second promise
undefined
 */
