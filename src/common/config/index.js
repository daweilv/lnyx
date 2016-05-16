var config;
try {
    config = require('./config');
} catch (err) {
    console.log(err);
    config = require('./config_default');
    console.log('use default config')
}
module.exports = config;