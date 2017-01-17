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
        filename: '[name]-[hash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }]

    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};