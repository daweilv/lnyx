var auth = {
    isLogin: function (req, res, next) {
        if (!req.session.user) {
            return res.redirect('/admin/login');
        }
        next();
    }

};

module.exports = auth;