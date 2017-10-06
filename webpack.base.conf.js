const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve } = require('path');

// eslint
var eslint = {
    configFile: __dirname + '/.eslinttrc.js'
}

module.exports = {
    //文件入口配置
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://127.0.0.1:8080',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    //文件输出配置
    output: {
        path: resolve(__dirname, './dist'), //打包输出目录
        // publicPath: '/',    // 共同路径前缀
    },
    //加载器配置
    module: {
        rules: [{
            test: /\.json$/,
            exclude: /node_modules/,
            loader: "json-loader"
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            }
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'images/[name].[hash:8].[ext]'
            }
        }]
    },
    //插件项
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),   // webpack 3 新增的作用域提升插件
        new CopyWebpackPlugin([
            {from: './src/resource/music/music.mp3'},
            {from: './src/resource/css/loader.css', to: 'css'}
        ])
    ]
}
