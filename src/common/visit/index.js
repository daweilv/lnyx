var RequestUtil = require('../util/RequestUtil');
var VisitController = require('../../admin/controller/visit');

var stat = function (req, res, next) {
    var visit = {
        ip: RequestUtil.getIP(req),
        useragent: RequestUtil.getUserAgent(req),
        url: req._parsedOriginalUrl.pathname,
        param: req._parsedOriginalUrl.query,
        session_id: req.sessionID
    };

    VisitController.insert(visit, function (err, rs) {
    });
    next();
};

module.exports = stat;