const webpack            = require('webpack');
const path               = require("path");
const fs                 = require('fs');
const HtmlWebpackPlugin  = require("html-webpack-plugin");

const srcFolder = path.resolve(__dirname, '../src');
const hotPort = 8080;

const findFiles = function(folder, pattern = /.*/, callback) {
  var flist = [];

  fs.readdirSync(folder).map(function(e){
    var fname = path.join(folder, e);
    var fstat = fs.lstatSync(fname);
    if (fstat.isDirectory()) {
      // don't want to produce a new array with concat
      Array.prototype.push.apply(flist, findFiles(fname, pattern, callback));
    } else {
      if (pattern.test(fname)) {
        flist.push(fname);
        if (callback) {
          callback(fname);
        }
      }
    }
  });
  return flist;
};




const paths = {};
findFiles(srcFolder, /^((?!Mock).)*Api.tsx?$/, path => {
    path = `.${path.substr(path.lastIndexOf('/'))}`;
    // path = path.replace(srcFolder, '');
    const pathSplit = path.split('Api.ts')[0];
    const newPath   = `${pathSplit}MockApi`;
    const key = `${pathSplit}Api`;
    paths[key] = newPath;
});

const config = {
    entry: [
        `webpack-dev-server/client?http://localhost:${hotPort}`,
        'webpack/hot/only-dev-server',
        './web.tsx'
    ],
    output: {
		path: path.resolve(__dirname, "web"),
		filename: 'web.js',
		publicPath: "/"
	},
    context: srcFolder,
    devtool: "inline-source-map",
    resolve: {
        alias: paths,
        extensions: ['.ts', '.tsx', '.js', '.jsx']
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
        overlay: true,
        stats: {
            colors: true
        },
        port: hotPort,
        hot: true,
        inline: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
			inject: true,
			template: 'web.html'
		}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

module.exports = config;