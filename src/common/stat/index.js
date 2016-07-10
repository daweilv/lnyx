var RequestUtil = require('../util/RequestUtil');

var stat = function (req, res, next) {
    var ip = RequestUtil.getIP(req);
    var useragent = RequestUtil.getUserAgent(req);
    var path = req._parsedOriginalUrl.pathname;
    var query = req._parsedOriginalUrl.query;

    next();
};

module.exports = stat;