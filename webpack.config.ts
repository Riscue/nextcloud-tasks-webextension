import {Configuration, DefinePlugin, RuleSetRule} from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {resolve} from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as config from './package.json';

function resolveTsAliases({tsconfigPath = './tsconfig.json', webpackConfigBasePath = __dirname, params = {}}) {
    const {paths, baseUrl} = require(tsconfigPath).compilerOptions;
    const aliases = {};

    const replace = (str) => {
        return str.replace('/*', '').replace('*', '').replace('./', '').replace('.', '');
    };

    Object.keys(paths).forEach((item) => {
        const key = replace(item);
        aliases[key] = resolve(webpackConfigBasePath, replace(baseUrl), replace(paths[item][0]));
    });

    return aliases;
}

export default (env: any = {}): Configuration => {
    const production    = !!env.production;
    const platform      = env.platform || 'chrome';

    console.log('Production: ', production);
    console.log('Platform  : ', platform);

    const rules: RuleSetRule[] = [
        {
            test    : /\.ts$/,
            exclude : /node_modules/,
            loader  : 'awesome-typescript-loader',
            options :{
                transpileOnly: production
            }
        },
        {
            test    : /\.html$/,
            loader  : 'raw-loader',
            exclude : [
                `${__dirname}/src/platform/generic/html/popup.html`,
                `${__dirname}/src/platform/generic/html/options.html`
            ]
        },
        {
            test    : /\.scss$/,
            use     : [
                'vue-style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader  : 'sass-loader',
                    options : {
                        sassOptions: {
                            outputStyle: production ? 'compressed' : undefined
                        }
                    }
                }
            ]
        },
        {
            test    : /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader  : 'url-loader',
            options : {
                limit : 50000,
                name  : '/assets/[name].[ext]',
            }
        },
    ];

    const plugins = [
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
        new CopyWebpackPlugin(
            [
                {
                    from        : `src/platform/generic`,
                    ignore      : ['**/ts/**'],
                },
                {
                    from        : `src/platform/${platform}`,
                    ignore      : ['**/ts/**'],
                }
            ]
        ),
        new MiniCssExtractPlugin({filename: 'css/[name].css'}),
        new CleanWebpackPlugin(
            {
                cleanStaleWebpackAssets     : false,
                cleanOnceBeforeBuildPatterns: ['**/*'],
                cleanAfterEveryBuildPatterns: ['scss']
            }
        )
    ];

    if (production) {
    } else {
        rules.push(
            {
                test    : /\.ts$/,
                exclude : /node_modules/,
                enforce : 'pre',
                loader  : 'tslint-loader'
            }
        );
    }

    return {
        mode    : production ? 'production' : 'development',
        devtool : production ? false : 'inline-source-map',
        entry   : {
            popup           : `${__dirname}/src/ts/popup.ts`,
            options         : `${__dirname}/src/ts/options.ts`,
            background      : `${__dirname}/src/ts/background.ts`,
        },
        output  : {
            path            : `${__dirname}/dist/`,
            filename        : 'js/[name].js'
        },
        resolve : {
            modules         : ['node_modules', 'src'],
            extensions      : ['.ts', '.js', '.json'],
            alias           : {
                vue: 'vue/dist/vue.esm.js',
                ...resolveTsAliases({params: {platform}})
            }
        },
        module  : {rules},
        plugins
    };
};
