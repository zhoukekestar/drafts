const babel = require('babel-core');
const plugin = require('./babel-plugin');

const source = `
a === b;
`;

const { code } = babel.transform(source, { plugins: [plugin]});

console.log(code);
