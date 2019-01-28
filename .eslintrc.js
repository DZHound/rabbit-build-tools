module.exports = {
    parser: 'babel-eslint',
    'plugins': ['react-native'],
    "extends": "airbnb",
    rules: {
        'max-len': ['error', {code: 120, tabWidth: 4}],
        'arrow-body-style': 'off',
        'arrow-parens': 'off',
        'class-methods-use-this': 'off',
        'global-require': 'off',
        "indent": ['error', 4, {"SwitchCase": 1}],
        'padded-blocks': 'off',
        'no-useless-constructor': "off",
        'comma-dangle': ['error', 'never'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-filename-extension': ['error', {'extensions': ['.js', '.jsx']}],
        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/require-default-props': 'off',
        'object-curly-spacing': 'off',
        'no-param-reassign': 'off'
    }
};
