const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    console.log(env);
    console.log(argv);

    let minimizeHTML = false;
    const sassLoaders = ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'];

    if (argv.mode === 'production') {
        sassLoaders.push('postcss-loader');
        minimizeHTML = true;
    }

    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: minimizeHTML
                            }
                        }
                    ]
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: sassLoaders
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
    };
};
