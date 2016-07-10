var RequestUtil = {
    getUserSession: function getUserSession(req) {
        return req.session.user;
    },
    getLogin: function (req) {
        return req.session.login;
    },
    getIP: function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0]
            || req.connection.remoteAddress;
    },
    getUserAgent: function (req) {
        return req.headers['user-agent'];
    }
};

module.exports = RequestUtil;