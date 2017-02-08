'use strict';

var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
    __PRODUCTION__: process.env.NODE_ENV === 'prod'
});

const envMap = {
    dev: 'local',
    prod: 'prod'
};

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
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.json$/, loader: "json-loader"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", 'postcss-loader', "sass-loader"]
            }
        ]

    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, 'src', 'env', envMap[process.env.NODE_ENV], 'conf')
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new HtmlWebpackPlugin(),
        definePlugin
    ]
};