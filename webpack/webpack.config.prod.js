const webpack           = require('webpack');
const path              = require("path");
const merge             = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base              = require("./webpack.config.base");

const config = {
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|__tests__)/,
                use: ['awesome-typescript-loader']
            }
        ]
    },
    output: {
        filename: "[name].[chunkhash].js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            allChunks: true,
            disable: false
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}

module.exports = merge(base, config);