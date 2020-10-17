import nodeResolve from '@rollup/plugin-node-resolve';
import importToUrl from 'rollup-plugin-esm-import-to-url';
import serve from 'rollup-plugin-serve'
import babel from '@rollup/plugin-babel';

const plugins = [
  babel({ presets: ['@babel/preset-react'] }),
  importToUrl({
    imports: {
      react: 'https://jspm.alibaba-inc.com/react',
      'react-dom': 'https://jspm.alibaba-inc.com/react-dom',
    },
  }),
  nodeResolve(),
];

// 如果是本地监听模式，则启动服务器
if (process.argv.includes('-w')) {
  plugins.push(serve({
    contentBase: ['dist', 'public']
  }));
}

export default {
  input: './src',
  output: {
    dir: 'dist',
    format: "esm",
  },
  plugins,
};
