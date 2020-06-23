import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import importToUrl from 'rollup-plugin-esm-import-to-url';
import serve from 'rollup-plugin-serve'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path from 'path';

export default {
  input: './src',
  output: {
    dir: 'dist',
    format: "esm",
  },
  plugins: [
    babel({ presets: ['@babel/preset-react'] }),
    importToUrl({
      imports: {
        'react': 'https://cdn.pika.dev/react',
        'react-dom': 'https://cdn.pika.dev/react-dom',
      },
    }),
    nodeResolve({
      // mainFields: ['esm', 'browser:module', 'module', 'browser', 'main'],
      // extensions: ['.mjs', '.cjs', '.js', '.json'],
      // preferBuiltins: true,
    }),
    commonjs({
      // extensions: ['.js', '.cjs'],
    }),
    nodeGlobals(),

    serve({
      contentBase: ['dist', 'public']
    }),
  ],
};
