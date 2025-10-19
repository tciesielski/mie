const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Creates a shared dependencies configuration for Module Federation
 * @param {Object} dependencies - The dependencies object from package.json
 * @returns {Object} Configured shared dependencies
 */
function createSharedDeps(dependencies) {
    return Object.keys(dependencies).reduce((acc, dep) => {
        // Skip Emotion packages
        if (dep.includes('@emotion/styled')) {
            return acc;
        }

        // Configure React and React DOM as singletons
        if (dep === 'react' || dep === 'react-dom') {
            acc[dep] = {
                singleton: true,
                requiredVersion: dependencies[dep],
            };
        } else {
            // Share other dependencies normally
            acc[dep] = {
                requiredVersion: dependencies[dep],
            };
        }

        return acc;
    }, {});
}

module.exports.commonConfig = {
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-react', {
                            runtime: 'automatic'
                        }],
                        '@babel/preset-env'
                    ],
                    plugins: ['@babel/plugin-transform-runtime'],
                },
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
};

module.exports.createSharedDeps = createSharedDeps;