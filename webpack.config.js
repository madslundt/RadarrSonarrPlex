const webpack = require("webpack");
const prod    = require('./webpack/webpack.config.prod');
const dev     = require('./webpack/webpack.config.dev');

const isProduction = process.env.NODE_ENV === "production";

let config;

if (isProduction) {
    config = prod;
} else {
    config = dev;
}

module.exports = config;
