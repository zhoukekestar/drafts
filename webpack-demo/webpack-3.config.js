const webpack = require('webpack');
const path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './src/entry-3.js',
            vendor: 'moment'
        },
        output: {
            // filename: 'bundle-3.[name].[chunkhash].js',
            filename: 'bundle-3.[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            })
        ]
    }
}
