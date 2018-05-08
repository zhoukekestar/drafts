
// 常规位运算
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
const AND = (a, b) => a & b;
const OR = (a, b) => a | b;
const XOR = (a, b) => a ^ b;
const NOT = a => ~a;

// Fake Node Assert Lib
const assert = {
  deepEqual: (a, b) => {
    if (a.toString() === b.toString()) return;
    throw new Error(`Not Equal: ${a} ${b}`);
  }
}


/**
 * 半加器
 * 两个 bit 输入，输出数组 [进位，和]
 * 如：
 *  1,1 => [1, 0]
 * @param {bit} a 输入
 * @param {bit} b 输入
 */
const HalfAdder = (a, b) => [a & b, a ^ b];

// 半加器测试
assert.deepEqual(HalfAdder(0, 0), [0, 0]);
assert.deepEqual(HalfAdder(0, 1), [0, 1]);
assert.deepEqual(HalfAdder(1, 0), [0, 1]);
assert.deepEqual(HalfAdder(1, 1), [1, 0]);


/**
 * 全加器
 * 两个 bit 输入，和进位输入，输出数组 [进位，和]
 * 如：
 *  0,1,1 => [1, 0]
 * @param {bit} a 输入
 * @param {bit} b 输入
 * @param {bit} c 进位输入
 */
const FullAdder = (a, b, c) => {
  var t1 = HalfAdder(a, b);
  var t2 = HalfAdder(t1[1], c);
  return [t1[0] | t2[0], t2[1]];
}

// 全加器测试
assert.deepEqual(FullAdder(0, 0, 0), [0, 0]);

assert.deepEqual(FullAdder(1, 0, 0), [0, 1]);
assert.deepEqual(FullAdder(0, 1, 0), [0, 1]);
assert.deepEqual(FullAdder(0, 0, 1), [0, 1]);

assert.deepEqual(FullAdder(1, 1, 0), [1, 0]);
assert.deepEqual(FullAdder(1, 0, 1), [1, 0]);
assert.deepEqual(FullAdder(0, 1, 1), [1, 0]);

assert.deepEqual(FullAdder(1, 1, 1), [1, 1]);


/**
 * 波纹加法器， 4 位加法器
 * 如：
 *  [0, 1, 0, 1],[0, 1, 0, 1] => [1, 0, 1, 0]
 * @param {Array<Number>} a 4位 bit 输入数组，如：[0, 1, 0, 1]
 * @param {Array<Number>} b 4位 bit 输入数组，如：[0, 1, 0, 1]
 * @returns {Array<Number>}
 */
const RippleCarryAdder = (a, b) => {
  let carry = 0;
  let bit = 3;
  let result = [];
  while(bit >= 0) {
    let temp = FullAdder(a[bit], b[bit], carry);
    carry = temp[0];
    result.push(temp[1]);

    bit--;
  }

  return result.reverse();
}

/**
 * 将数字转成 4 位二进制数组
 * 如：
 *    1 => [0, 0, 0, 1]
 *    3 => [0, 0, 1, 1]
 * @param {Number} a 数字
 * @returns {Array<Number>}
 */
const to4Bit = a => (
  a.toString(2)
    .split('')
    .reverse()
    .concat(Array(4).fill('0'))
    .slice(0,4)
    .reverse()
    .map(i => +i)
);

/**
 * 将二进制字符串转为数字
 * 如：
 *  '1010' => 10
 * @param {String} a 4 位二进制字符串
 * @returns {Number}
 */
const from4Bit = a => parseInt(a, 2);

/**
 * 加法简写工具
 * @param {Number} a 输入
 * @param {Number} b 输入
 */
const helper = (a, b) => (
  from4Bit(RippleCarryAdder(
    to4Bit(a),
    to4Bit(b)
  ).join(''))
)

assert.deepEqual(helper(0, 0), 0);
assert.deepEqual(helper(1, 1), 2);
assert.deepEqual(helper(1, 2), 3);
assert.deepEqual(helper(2, 2), 4);
assert.deepEqual(helper(3, 5), 8);
assert.deepEqual(helper(1, 14), 15);

// 9 + 14 为 23，但由于我们写的是 4 位加法器，所以有溢出
// 最终的结果需要 mod 0x10（也就是 16）
assert.deepEqual(helper(9, 14), 23 % 0x10);
assert.deepEqual(helper(9, 14), 7);


