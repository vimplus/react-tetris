const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.conf.js');

var buildInfo = {
    assets: true, // 增加资源信息
    assetsSort: "field", // 对资源按指定的项进行排序
    cached: true, // 增加缓存了的（但没构建）模块的信息
    children: true, // 增加子级的信息
    chunks: false, // 增加包信息（设置为 `false` 能允许较少的冗长输出）
    chunkModules: false, // 将内置模块信息增加到包信息
    chunkOrigins: false, // 增加包 和 包合并 的来源信息
    chunksSort: "field", // 对包按指定的项进行排序
    context: "../src/", // 用于缩短请求的上下文目录
    colors: true, // 等同于`webpack --colors`
    errors: true, // 增加错误信息
    errorDetails: true, // 增加错误的详细信息（就像解析日志一样）
    hash: true, // 增加编译的哈希值
    modules: false, // 增加内置的模块信息
    modulesSort: "field", // 对模块按指定的项进行排序
    publicPath: true, // 增加 publicPath 的信息
    reasons: true, // 增加模块被引入的原因
    source: true, // 增加模块的源码
    timings: true, // 增加时间信
    version: false, // 增加 webpack 版本信息
    warnings: true // 增加提示
}

module.exports = merge(webpackBaseConfig, {
    output: {
        filename: 'js/[name].[hash:8].js'
    },
    devtool: '#eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        stats: buildInfo
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    //插件项
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new OpenBrowserPlugin({
            url: 'http://127.0.0.1:8080/'
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.dev.html' //html模板路径
        }),
        new HtmlWebpackHarddiskPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ]
})
