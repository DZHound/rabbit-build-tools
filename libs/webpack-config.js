const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const defaultBabelConfig = require('./babel-config-default');
const { isProduction } = require('./utils');

const cwd = process.cwd();

function projectPath(...filepath) {
    return path.join(cwd, ...filepath);
}

function getWebpackConfig(babelConfig, styleFileName) {

    if (!babelConfig) {
        babelConfig = defaultBabelConfig();
    }

    if (!styleFileName) {
        styleFileName = 'style.css';
    }

    let postcssConfigJsPath = require.resolve('./postcss.config.js');
    const postcssConfigProjectPath = projectPath('./postcss.config.js');
    if (fs.existsSync(postcssConfigProjectPath)) {
        postcssConfigJsPath = postcssConfigProjectPath;
    }

    const lessLoaders = [
        {
            loader: 'css-loader',
            options: {sourceMap: false, importLoaders: 2}
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: postcssConfigJsPath
                }
            }
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                sourceMap: false
            }
        }
    ];

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {sourceMap: false, importLoaders: 2}
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: postcssConfigJsPath
                }
            }
        }
    ];

    const config = {
        // devtool: 'source-map',

        output: {
            path: projectPath('./dist/'),
            filename: '[name].js'
        },

        resolve: {
            modules: ['node_modules', path.join(__dirname, '../node_modules')],
            extensions: [
                '.web.jsx',
                '.web.js',
                '.js',
                '.jsx',
                '.json'
            ]
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: babelConfig
                },
                {
                    test: /\.less$/,
                    use: isProduction()
                        ? ExtractTextPlugin.extract({
                            use: lessLoaders
                        }) : lessLoaders
                },
                {
                    test: /\.css$/,
                    use: isProduction()
                        ? ExtractTextPlugin.extract({
                            use: cssLoaders
                        }) : cssLoaders
                },
                {
                    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        minetype: 'image/svg+xml',
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: '[name].[ext]'
                    }
                }
            ]
        },

        plugins: [
            new Es3ifyPlugin(),
            new CaseSensitivePathsPlugin()
        ]
    };

    if (isProduction()) {
        config.plugins = [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    warnings: false,
                    ie8: true
                }
            }),
            new OptimizeCSSAssetsPlugin(),
            new Es3ifyPlugin(),
            new CaseSensitivePathsPlugin(),
            new ExtractTextPlugin(styleFileName)
        ];
    }

    return config;
}

const WebpackConfig = {};
WebpackConfig.webpack = webpack;
WebpackConfig.getWebpackConfig = getWebpackConfig;

module.exports = WebpackConfig;
