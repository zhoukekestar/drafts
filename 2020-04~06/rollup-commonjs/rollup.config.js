import commonjs from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    rollupPluginNodeResolve({
      mainFields: ['browser:module', 'module', 'browser', 'main'],
      extensions: ['.mjs', '.cjs', '.js', '.json'],
      preferBuiltins: true,
      dedupe: []
    }),
    commonjs({
      extensions: ['.js', '.cjs']
    })
  ]
};
