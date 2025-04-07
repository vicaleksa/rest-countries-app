const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProd = process.env.MODE === 'production';

const config = {
    entry: './src/index.tsx',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            defaultExport: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:3]',
                            },
                        },
                    },
                ],
            },
        ],
    },
};

if (isProd) {
    config.optimization = {
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    };
}

module.exports = config;
