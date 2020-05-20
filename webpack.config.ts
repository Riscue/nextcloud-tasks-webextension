import {Configuration, DefinePlugin} from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';
import {resolve} from 'path';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as config from './package.json';

function resolveTsAliases({tsconfigPath = './tsconfig.json', webpackConfigBasePath = __dirname, params = {}}) {
    const {paths, baseUrl} = require(tsconfigPath).compilerOptions;
    const aliases = {};

    const replace = function (str) {
        return str.replace('/*', '').replace('*', '').replace('./', '').replace('.', '');
    };

    Object.keys(paths).forEach((item) => {
        const key = replace(item);
        aliases[key] = resolve(webpackConfigBasePath, replace(baseUrl), replace(paths[item][0]));
    });

    console.log(aliases);
    return aliases;
}

export default (env): Configuration => {
    let production = env.production === true,
        platform   = env.platform || 'chrome';
    console.log('Production: ', production);
    console.log('Platform  : ', platform);

    return {
        mode   : production ? 'production' : 'development',
        devtool: production ? false : 'inline-source-map',
        entry  : {
            client    : `${__dirname}/src/ts/client.ts`,
            popup     : `${__dirname}/src/ts/popup.ts`,
            options   : `${__dirname}/src/ts/options.ts`,
            background: `${__dirname}/src/ts/background.ts`,
        },
        output : {
            path      : `${__dirname}/dist/`,
            filename  : "js/[name].js"
        },
        resolve: {
            modules   : ['node_modules', 'src'],
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias     : resolveTsAliases({params: {'platform': platform}})
        },
        module : {
            rules: [
                {
                    test  : /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test   : /\.ts$/,
                    exclude: /node_modules/,
                    use    : [
                           {
                               loader : 'ts-loader',
                               options: {
                                   appendTsSuffixTo: [/\.vue$/]
                               }
                           }
                    ]
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
                                    outputStyle: production ? 'compressed' : undefined
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new DefinePlugin(
                {
                    'process.env': {
                        NODE_ENV    : production ? '"production"' : '"development"',
                        APP_VERSION : `"${config.version}"`,
                        APP_NAME    : `"${config.name}"`,
                        APP_PLATFORM: `"${platform}"`,
                        BUILD_TARGET: `"${platform}"`
                    }
                }
            ),
            new VueLoaderPlugin(),
            new CopyWebpackPlugin([`src/platform/generic`, `src/platform/${platform}`]),
            new MiniCssExtractPlugin({filename: 'css/[name].css'}),
            new CleanWebpackPlugin(
                {
                    cleanStaleWebpackAssets     : false,
                    cleanOnceBeforeBuildPatterns: ['**/*'],
                    cleanAfterEveryBuildPatterns: ['scss']
                }
            ),
        ]
    };
};
