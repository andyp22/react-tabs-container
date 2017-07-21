import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageJson = require('./package.json');

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    minimize: true,
    importLoaders: 2,
    localIdentName: '[hash:base64:5]',
    discardComments: {
      removeAll: true
    }
  }
};

export default () => ({
    entry: {
        index: path.join(__dirname, 'src/index.js'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'ReactTabsContainer',
        libraryTarget: 'umd',
    },

    module: {
        rules: [

            // Source maps for JavaScript and Typescript files.
            // Added to bundle.js
            {
                enforce: 'pre',
                test: /\.(js|tsx?)$/,
                use: "source-map-loader"
            },
            // Loader for Typescript files.
            // Added to bundle.js
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                            ],
                        }
                    }
                ]
            },
            // SASS loader and extractor
            // Extracts as CSS to /css/styles.css
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoader,
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            // CSS loader
            // Added to /css/styles.css
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoader
                    ]
                })
            }
        ]
    },

    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(['dist/*.*']),

        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        //https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
});