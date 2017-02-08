'use strict';

var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
    __PRODUCTION__: process.env.NODE_ENV === 'prod'
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
                loader: ExtractTextPlugin.extract('css!sass')
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
        definePlugin,
        new ExtractTextPlugin('style-[hash].css'),
        new CommonsChunkPlugin({
            filename: "common.js",
            name: "common"
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, 'images/background.jpg')
        })
    ]
};