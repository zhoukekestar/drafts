const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const generate = require('babel-generator').default;

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

