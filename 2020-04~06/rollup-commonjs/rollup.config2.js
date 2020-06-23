import rollupPluginCommonJS from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import rollupPluginNodeGlobals from 'rollup-plugin-node-globals'
import importToUrl from 'rollup-plugin-esm-import-to-url'
import path from 'path';

export default {
  input: {
    index: path.join(__dirname, './src/index.js'),
    // react: path.join(__dirname, "node_modules/react/index.js"),
    // 'react-dom': path.join(__dirname, "node_modules/react-dom/index.js"),
  },
  output: {
    dir: 'output',
    // chunkFileNames: "common/[name]-[hash].js",
    // exports: "named",
    format: "esm",
  },
  plugins: [
    importToUrl({
      imports: {
        'react': 'https://cdn.pika.dev/react',
        'react-dom': 'https://cdn.pika.dev/react-dom',
      },
    }),
    rollupPluginNodeResolve({
      // mainFields: ['esm', 'browser:module', 'module', 'browser', 'main'],
      // extensions: ['.mjs', '.cjs', '.js', '.json'],
      // preferBuiltins: true,
    }),
    rollupPluginCommonJS({
      // extensions: ['.js', '.cjs'],
    }),
    rollupPluginNodeGlobals(),


  ]
};
