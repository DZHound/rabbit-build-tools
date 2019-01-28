const Constants = require('./constants');

function isDevelopment() {
    return process.env.NODE_ENV === Constants.KEY_DEVELOPMENT;
}

function isProduction() {
    return process.env.NODE_ENV === Constants.KEY_PRODUCTION;
}

module.exports = {
    isDevelopment,
    isProduction
};
