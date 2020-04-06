// eslint-disable-next-line import/no-commonjs,flowtype/require-valid-file-annotation
module.exports = (api) => {
    const modules = api.env() === 'esm' ? false : 'auto';
    return {
        extends:    'grumbler-scripts/config/.babelrc-browser',
        presets:    [
            [
                '@babel/env',
                {
                    modules
                }
            ]
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    'useESModules': !modules
                }
            ]
        ]
    };
};
