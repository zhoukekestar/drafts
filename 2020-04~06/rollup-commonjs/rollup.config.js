import commonjs from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: {
    react: "/Users/zhoukeke/workspace/gitlab/temp-repos/alipay-uo-grid-small-line-chart/node_modules/react/index.js",
    'react-dom': "/Users/zhoukeke/workspace/gitlab/temp-repos/alipay-uo-grid-small-line-chart/node_modules/react-dom/index.js",
  },
  treeshake: true,
  output: {
    dir: 'output',
    chunkFileNames: "common/[name]-[hash].js",
    exports: "named",
    format: "esm",
  },
  plugins: [
    rollupPluginNodeResolve({
      // browser: true,
      mainFields: ['esm', 'browser:module', 'module', 'browser', 'main'],
      extensions: ['.mjs', '.cjs', '.js', '.json'],
      preferBuiltins: true,
      // dedupe: ['react-dom'],
    }),
    commonjs({
      extensions: ['.js', '.cjs'],
      transformMixedEsModules: true,
    }),

  ]
};
