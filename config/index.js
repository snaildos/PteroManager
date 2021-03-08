const rfr = require('rfr');
const _ = require('lodash');
const Cache = require('memory-cache');

class Config {

    constructor() {
        if (_.isNull(Cache.get('config'))) {
            Cache.put('config', this.raw());
        }
    }

    raw() {
        try {
            return rfr('config/core.json');
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                console.error('No config file located for Daemon');
                process.exit(1);
            }
            throw e;
        }
    }

    reload() {
        return Cache.put('config', this.raw());
    }

    get(key, defaultResponse) {
        let getObject;
        try {
            getObject = _.reduce(_.split(key, '.'), (o, i) => o[i], Cache.get('config'));
        } catch (ex) { _.noop(); }

        if (!_.isUndefined(getObject)) {
            return getObject;
        }

        return (!_.isUndefined(defaultResponse)) ? defaultResponse : undefined;
    }

}

module.exports = new Config;