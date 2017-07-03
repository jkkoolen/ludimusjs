const path = require('path');
const _ = require('lodash');

let config = null;
const defaultConfig = {
    port: 3000,
    urls: [
        /^\/ludimus\//
    ]
};

function loadConfig() {
     config = _.mergeWith({}, defaultConfig, {}, function(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });

    return config;
}

module.exports = _.isObject(config) ? config : loadConfig();