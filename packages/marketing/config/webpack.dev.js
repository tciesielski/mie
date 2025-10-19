const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackCommon = require('./webpack.common');
const packageJson = require('../package.json');

const { commonConfig, createSharedDeps } = webpackCommon;
const sharedDeps = createSharedDeps(packageJson.dependencies);

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: '8081',
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: sharedDeps
        })
    ]
};

module.exports = merge(commonConfig, devConfig);
