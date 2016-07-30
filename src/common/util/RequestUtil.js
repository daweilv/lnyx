var RequestUtil = {
    getUser: function (req) {
        return req.session.user;
    },
    getLogin: function (req) {
        return req.session.login;
    },
    getIP: function (req) {
        var ip =  (req.headers['x-forwarded-for'] || '').split(',')[0]
            || req.connection.remoteAddress;
        ip = ip.replace('::ffff:','');
        return ip;
    },
    getUserAgent: function (req) {
        return req.headers['user-agent'];
    },
    getReferrer: function (req) {
        return req.headers['referer'];
    }
};

module.exports = RequestUtil;