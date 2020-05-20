const {resolve} = require('path');

function resolveTsconfigPathsToWebpackAlias ({
                                                 tsconfigPath = './tsconfig.json',
                                                 webpackConfigBasePath = __dirname,
                                                 params = {}
                                             } = {}) {
    const {paths, baseUrl} = require(tsconfigPath).compilerOptions;

    const aliases = {};

    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '');
        aliases[key] = resolve(webpackConfigBasePath, baseUrl.replace('./', '').replace('.', ''), paths[item][0].replace('/*', '').replace('*', '').replace('./', '').replace('.', ''));
    });

    return aliases;
}

module.exports = resolveTsconfigPathsToWebpackAlias;
