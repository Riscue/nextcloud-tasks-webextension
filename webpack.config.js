/* eslint-disable */
let webpack              = require('webpack'),
    config               = require('./package.json'),
    CopyWebpackPlugin    = require('copy-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    VueLoaderPlugin      = require('vue-loader/lib/plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    let production = env.production === true,
        platform   = env.platform ? env.platform : 'chrome';
    console.log('Production: ', production);
    console.log('Platform  : ', platform);

    let plugins = [
        new webpack.DefinePlugin(
            {
                'process.env': {
                    NODE_ENV    : production ? '"production"' : '"development"',
                    APP_VERSION : `"${config.version}"`,
                    APP_NAME    : '"extension"',
                    APP_PLATFORM: `"${platform}"`,
                    BUILD_TARGET: `"${platform}"`
                }
            }
        ),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({patterns: [`src/platform/generic`, `src/platform/${platform}`]}),
        new MiniCssExtractPlugin({filename: 'css/[name].css'}),
        new CleanWebpackPlugin(
            {
                cleanStaleWebpackAssets     : false,
                cleanOnceBeforeBuildPatterns: ['**/*'],
                cleanAfterEveryBuildPatterns: ['js/Platform', 'scss']
            }
        ),
    ];

    return {
        mode   : production ? 'production' : 'development',
        devtool: production ? 'none' : 'inline-source-map',
        entry  : {
            client    : `${__dirname}/src/js/client.js`,
            popup     : `${__dirname}/src/js/popup.js`,
            options   : `${__dirname}/src/js/options.js`,
            background: `${__dirname}/src/js/background.js`,
        },
        output : {
            path      : `${__dirname}/dist/`,
            filename  : "js/[name].js"
        },
        resolve: {
            modules   : ['node_modules', 'src'],
            extensions: ['.js', '.vue', '.json'],
            alias     : {
                '@vue'  : `${__dirname}/src/vue`,
                '@js'   : `${__dirname}/src/js`,
                '@jsP'  : `${__dirname}/src/platform/${platform}/js`,
                '@scss' : `${__dirname}/src/scss`,
                '@scssP': `${__dirname}/src/platform/${platform}/scss`
            }
        },
        module : {
            rules: [
                {
                    test  : /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test   : /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader : 'url-loader',
                    options: {
                        limit          : 256,
                        outputPath     : 'css/',
                        publicPath     : '/css/',
                        useRelativePath: false
                    }
                },
                {
                    test: /\.scss$/,
                    use : [
                        {
                            loader: 'vue-style-loader'
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader : 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'compressed'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins
    };
};
