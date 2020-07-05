const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        unit_test: path.resolve(__dirname, 'src/index.js'),
    },
    // output: {}, configured at webpackCases.test.js,
    resolveLoader: {
        alias: {
            'constructable-style-loader': path.resolve(__dirname, '../../../src/index.js')
        }
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'constructable-style-loader',
                        options: {
                            purge: true,
                            content: ['**/*.js'],
                            whitelist: ['white-listed']
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
};
