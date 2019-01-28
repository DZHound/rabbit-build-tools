const Constants = require('./constants');

module.exports = function () {

    const env = process.env.NODE_ENV;

    const presets = [
        'react',
        'es2015-loose',
        [
            'env',
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 8',
                        'iOS >= 8',
                        'Android >= 4'
                    ]
                }
            }
        ],
        'stage-1'
    ];

    const plugins = [
        [
            'transform-runtime',
            {
                helpers: false
            }
        ],
        'transform-react-constant-elements',
        'transform-react-inline-elements',
        'transform-es3-modules-literals',
        'transform-es3-member-expression-literals',
        'transform-es3-property-literals'
    ];

    if (env === Constants.KEY_PRODUCTION) {
        plugins.push('transform-react-remove-prop-types');
    }

    return {
        presets,
        plugins
    };

};
