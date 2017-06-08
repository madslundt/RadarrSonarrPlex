const webpack           = require('webpack');
const path              = require("path");
const merge             = require('webpack-merge');
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
        filename: "[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}

module.exports = merge(base, config);