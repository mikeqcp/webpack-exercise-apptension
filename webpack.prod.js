'use strict';

require('babel-polyfill');

const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        'main': [
            './src/styles/main.scss',
            './src/main.js'
        ],
        'unsupported': [
            './src/styles/main.scss',
            './src/unsupported.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.json$/, loader: 'json-loader', exclude: /build\.info\.json$/ },
            { test: /\.(png|jpg)$/, loader: "file" },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?{browsers:["last 2 version", "> 5%", "iOS >= 7"]}!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
            },
        ]
    },
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx', '.css'],
        alias: {
            'config': 'env/prod/conf.js'
        }
    },
    plugins: [
        new CleanPlugin('dist'),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'main.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['unsupported'],
            filename: 'unsupported.html'
        }),
        new webpack.DefinePlugin({
            __PRODUCTION__: true
        }),
    ]
};
