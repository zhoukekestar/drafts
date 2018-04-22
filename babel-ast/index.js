const babylon  = require("babylon");
const { default: traverse } = require("babel-traverse");
const { default: generate } = require('babel-generator');

const code = `
  const abc = 1;
  let hello = 'world';
`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (path.node.type === 'Identifier') {
      path.node.name = path.node.name.split('').reverse().join('');
    }
  }
});

console.log(generate(ast).code);
// output:
// const cba = 1;
// let olleh = 'world';

