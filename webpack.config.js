const webpack = require("webpack");
const prod    = require('./webpack/webpack.config.prod');
const dev     = require('./webpack/webpack.config.dev');
const web     = require('./webpack/webpack.config.web');

const isProduction = process.env.NODE_ENV === "production";
const isWeb = process.env.NODE_ENV === "web";

let config;

if (isProduction) {
    config = prod;
} else if (isWeb) {
    config = web;
} else {
    config = dev;
}

module.exports = config;
