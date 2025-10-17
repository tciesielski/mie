const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const deps = packageJson.dependencies;
const sharedDeps = Object.keys(deps).reduce((acc, dep) => {
  // Skip Emotion packages
  if (dep.includes('@emotion')) {
    return acc;
  }
  
  // Configure React and React DOM as singletons
  if (dep === 'react' || dep === 'react-dom') {
    acc[dep] = {
      singleton: true,
      requiredVersion: deps[dep],
    };
  } else {
    // Share other dependencies normally
    acc[dep] = {
      requiredVersion: deps[dep],
    };
  }
  
  return acc;
}, {});


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
