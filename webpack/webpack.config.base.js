const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin   = require('stylelint-webpack-plugin');

const config = {
    entry: ["./src/index"],
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        publicPath: "/dist/"
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
            }, {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                     }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [
                                    require('postcss-smart-import')({ /* ...options */ }),
                                    require('autoprefixer')({ /* ...options */ }),
                                    require('precss')({ /* ...options */ }),
                                    require('doiuse')({ browsers:['ie >= 9', '> 1%'], }),
                                    require('colorguard')({ /* ...options */ }),
                                    require('postcss-unique-selectors')({ /* ...options */ }),
                                    require("postcss-reporter")({ clearMessages: true })
                                ];
                            }
                        }
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            configFile: './webpack/stylelint.config.js'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            minify: {
                removeComments: true
            }
        })
    ]
};

module.exports = config;