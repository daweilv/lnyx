var SessionUtil = {
    getUserSession: function getUserSession(req) {
        return req.session.user;
    }
};

module.exports = SessionUtil;