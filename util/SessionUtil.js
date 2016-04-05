var SessionUtil = {
    getUserSession: function getUserSession(req) {
        return req.session.UserSession;
    }
};

module.exports = SessionUtil;