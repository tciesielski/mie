const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackCommon = require('./webpack.common');
const packageJson = require('../package.json');

const { commonConfig, createSharedDeps } = webpackCommon;
const sharedDeps = createSharedDeps(packageJson.dependencies);

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/auth/latest/'
    },
    plugins: [
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

module.exports = merge(commonConfig, prodConfig);