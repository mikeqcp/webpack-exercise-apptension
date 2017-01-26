'use strict';

require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
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
            { test: /\.(png|jpg)$/, loader: "file-loader" },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx', '.css', '.scss'],
        alias: {
            'config': 'env/local/conf.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['unsupported'],
            filename: 'unsupported.html'
        }),
        new webpack.DefinePlugin({
            __PRODUCTION__: false
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'images/sprites'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprites/sprite.png'),
                css: path.resolve(__dirname, 'src/sprites/sprite.scss')
            },
            apiOptions: {
                cssImageRef: "../sprites/sprite.png"
            },
            retina: '@2x'
        })
    ]
};
