'use strict';
var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        'main': './src/main.js',
        'unsupported': './src/unsupported.js'
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};