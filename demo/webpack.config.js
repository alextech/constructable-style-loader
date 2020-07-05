const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        demo: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    resolveLoader: {
        alias: {
            'constructable-style-loader': path.resolve(__dirname, '../src/index.js')
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
                            whitelist: ['white-listed']
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
};
