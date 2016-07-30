var AdminLogic = {
    goIndex: function (req, res, next) {
        var _rs = {user: req.session.user};
        res.render('admin/index', _rs);
    }
};

module.exports = AdminLogic;