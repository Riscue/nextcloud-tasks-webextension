let webpack              = require('webpack'),
    config               = require('./package.json'),
    CopyWebpackPlugin    = require('copy-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    VueLoaderPlugin      = require('vue-loader/lib/plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSPlugin    = require('optimize-css-assets-webpack-plugin');

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
        new CopyWebpackPlugin(['src/platform/generic', 'src/platform/' + platform]),
        new MiniCssExtractPlugin({filename: 'css/main.css'}),
        new CleanWebpackPlugin(
            {
                cleanStaleWebpackAssets     : false,
                cleanOnceBeforeBuildPatterns: ['**/*'],
                cleanAfterEveryBuildPatterns: ['js/Platform', 'scss']
            }
        ),
    ];

    if(env.production) {
        plugins.push(
        );
    }

    return {
        mode   : production ? 'production':'development',
        devtool: 'none',
        entry  : {
            app       : __dirname + '/src/js/app.js',
            client    : __dirname + '/src/js/client.js',
            background: __dirname + '/src/js/background.js'
        },
        output : {
            path      : __dirname + '/dist/',
            filename  : "js/[name].js"
        },
        resolve: {
            modules   : ['node_modules', 'src'],
            extensions: ['.js', '.vue', '.json'],
            alias     : {
                '@vue'           : `${__dirname}/src/vue`,
                '@js'            : `${__dirname}/src/js`,
                '@js/Platform'   : `${__dirname}/src/platform/${platform}/js`,
                '@scss'          : `${__dirname}/src/scss`,
                '@scss/Platform' : `${__dirname}/src/platform/${platform}/scss`
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