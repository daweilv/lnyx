var RequestUtil = require('../util/RequestUtil');
var VisitController = require('../../admin/controller/VisitController');

var VisitLogic = function (req, res, next) {
    var visit = {
        ip: RequestUtil.getIP(req),
        useragent: RequestUtil.getUserAgent(req),
        referrer:RequestUtil.getReferrer(req),
        url: req._parsedOriginalUrl.pathname,
        param: req._parsedOriginalUrl.query,
        session_id: req.sessionID
    };

    VisitController.insert(visit, function (err, rs) {});
    next();
};

module.exports = VisitLogic;