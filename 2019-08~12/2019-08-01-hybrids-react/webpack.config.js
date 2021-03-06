const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

const config = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		filename: `${package.name}.js`,
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
    new webpack.ProgressPlugin(),
    // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
		})
  ],

	module: {
		rules: [
      {
        test: /.css$/,
        loader: 'css-loader',
      },
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: [
            'syntax-dynamic-import',
            ["@babel/plugin-proposal-class-properties"]
          ],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						],
            ["@babel/preset-react"],

					]
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

  externals: {
		react: 'React',
    'react-dom': 'ReactDOM'
  },

	devServer: {
		open: true
	}
};


module.exports = [
  config,
  Object.assign({}, config, {
    output: {
      ...config.output,
      filename: `${package.name}.withdeps.js`,
    },
    externals: {}
  }),
]
