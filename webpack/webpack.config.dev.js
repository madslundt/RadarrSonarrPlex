const webpack         = require('webpack');
const path            = require("path");
const merge           = require('webpack-merge');
const WriteFilePlugin = require("write-file-webpack-plugin");
const base            = require("./webpack.config.base");

const hotPort = 8080;

const config = {
    output: {
        publicPath: "http://localhost:" + hotPort + "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|__tests__)/,
                use: ['react-hot-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)(\?.+)?(#.+)?$/,
                use: ["url-loader?limit=100000"]
            }
        ]
    },
    devServer: {
        publicPath: "http://localhost:" + hotPort + "/dist/",
        contentBase: path.resolve("./dist"),
        port: hotPort,
        quiet: false,
        noInfo: false,
        historyApiFallback: true,
        hot: true,
        stats: {
            colors: true
        }
    },
    plugins: [
        new WriteFilePlugin({test: /\.html/})
    ]
}

module.exports = merge(base, config);