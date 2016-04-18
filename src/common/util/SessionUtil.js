var SessionUtil = {
    getUserSession: function getUserSession(req) {
        return req.session.user;
    },
    getLogin: function (req) {
        return req.session.login;
    }
};

module.exports = SessionUtil;