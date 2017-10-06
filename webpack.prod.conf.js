const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");

const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;

const webpackBaseConfig = require('./webpack.base.conf.js');
const version = require('./package.json').version;

module.exports = merge(webpackBaseConfig, {
    //文件输出配置
    output: {
        filename: 'js/[name].'+ version +'.js'
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: [
                { loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
            ]
        }]
    },
    devtool: false,
    //插件项
    plugins: [
        new webpack.HashedModuleIdsPlugin(),    // 稳定chunkhash
        new AggressiveMergingPlugin(),          // Merge chunks
        new ExtractTextPlugin({
            filename: 'css/[name].'+ version +'.css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [precss, autoprefixer];
                }
            }
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.html' // html模板路径
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,    // 删除所有的注释
			compress: {
				warnings: false,         // 在UglifyJs删除没有用到的代码时不输出警告
				drop_debugger: true,    // 删除所有的 debugger 关键字
				drop_console: true      // 删除所有的 `console` 语句
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
    ]
})
