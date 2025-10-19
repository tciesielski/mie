const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackCommon = require('./webpack.common');
const packageJson = require('../package.json');

const { commonConfig, createSharedDeps } = webpackCommon;
const sharedDeps = createSharedDeps(packageJson.dependencies);

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        static: {
            directory: './public', // Ensure this points to your static files directory
        },
    },
    plugins: [
        new ModuleFederationPlugin({ 
            name: 'container',
            remotes: [{
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                //dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
            }],
            shared: sharedDeps
        })
    ]
};

module.exports = merge(commonConfig, devConfig);