const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        index: "./src/index",
        options: "./src/options",
        background: "./src/background"
    },
    output: {
        path: path.resolve("./chrome"),
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        publicPath: "/"
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                use: ['source-map-loader']
            }, {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: ['source-map-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: false,
            minify: {
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: "options.html",
            template: "./src/options.html",
            inject: false,
            minify: {
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: "background.html",
            template: "./src/background.html",
            inject: false,
            minify: {
                removeComments: true
            }
        })
    ]
};

module.exports = config;