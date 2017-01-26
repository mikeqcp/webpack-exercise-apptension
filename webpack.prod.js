'use strict';

require('babel-polyfill');

const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize=true!postcss-loader!sass-loader'
                })
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx', '.scss', '.css'],
        alias: {
            'config': 'env/prod/conf.js'
        }
    },
    plugins: [
        new CleanPlugin('dist'),
        new ExtractTextPlugin({filename: '[name]-[chunkhash].css', allChunks: true}),
        new HtmlWebpackPlugin({
            chunks: ['main', 'common'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['unsupported', 'common'],
            filename: 'unsupported.html'
        }),
        new webpack.DefinePlugin({
            __PRODUCTION__: true
        }),
        new UglifyJSPlugin(),
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
        })
    ]
};
