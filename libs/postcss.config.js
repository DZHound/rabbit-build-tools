const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    ident: 'postcss',
    sourceMap: true,
    plugins: [
        cssnano(),
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        })
    ]
};
