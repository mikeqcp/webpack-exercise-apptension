'use strict';
var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var definePlugin = new webpack.DefinePlugin({
    __PRODUCTION__: process.env.NODE_ENV === 'prod'
});
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true';

const envMap = {
    dev: 'local',
    prod: 'prod'
};

module.exports = {
    context: __dirname,
    entry: {
        main: ['./src/main.js', hotMiddlewareScript],
        unsupported: ['./src/unsupported.js', hotMiddlewareScript]
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
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new HtmlWebpackPlugin(),
        definePlugin,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};