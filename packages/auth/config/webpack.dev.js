const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackCommon = require('./webpack.common');
const packageJson = require('../package.json');

const { commonConfig, createSharedDeps } = webpackCommon;
const sharedDeps = createSharedDeps(packageJson.dependencies);


const devConfig = {
    mode: 'development',
    // output: {
    //     publicPath: 'http://localhost:8082/'
    // },
    devServer: {
        port: '8082',
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath: '/' // alternatywa do output z domena ustawiona na sztywno
        }),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            shared: sharedDeps
        })
    ]
};

module.exports = merge(commonConfig, devConfig);
