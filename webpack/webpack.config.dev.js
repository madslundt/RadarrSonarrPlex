const webpack           = require('webpack');
const path              = require("path");
const merge             = require('webpack-merge');
const base              = require("./webpack.config.base");

const config = {
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
    }
}

module.exports = merge(base, config);