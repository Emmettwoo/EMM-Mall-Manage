const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "js/app.js"
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, "src/page"),
            service: path.resolve(__dirname, "src/service"),
            util: path.resolve(__dirname, "src/util"),
            component: path.resolve(__dirname, "src/component"),
        }
    },
    module: {
        rules: [
            // jsx脚本加载
            {
                test: /\.jsx$/,
                exclude: /(nide_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }
            },
            // css样式加载
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // scss样式加载
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            // 图片文件加载
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "resource/image/[name].[ext]",
                        limit: 8192
                    }
                }]
            },
            // 字体图标加载
            {
                test: /\.(eot|svg|woff|woff2|ttf|otf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "resource/font/[name].[ext]",
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        // Html处理插件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./favicon.ico"
        }),
        // CSS处理插件
        new ExtractTextPlugin("css/[name].css"),
        // 代码分离插件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "js/base.js",
        })
    ],
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: "/dist/index.html"
        },
        // 开发调试用的接口转发
        proxy: {
            "/manage": {
                target: "http://admintest.happymmall.com",
                changeOrigin: true
            },
            // 登出接口使用门户的，非manage接口，故另行配置
            "/user/logout.do": {
                target: "http://admintest.happymmall.com",
                changeOrigin: true
            }
        }
    }
};