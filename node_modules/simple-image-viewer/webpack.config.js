var webpack = require('webpack')
var fs = require('fs')

var webpackConfig = {
	entry: __dirname + '/src/index.js',
	output: {
        path: __dirname + '/lib',
        filename: 'index.js',
        publicPath: '/lib/',
        library: 'simple-image-viewer',
        libraryTarget: 'umd'
    },
	module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
	},
    externals: {
        'react': 'react',
        'react-icons/lib/io': 'react-icons/lib/io',
        'react-swipeable': 'react-swipeable'
    }
}

module.exports = webpackConfig