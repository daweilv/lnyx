var async = require('async');

var UserController = require('../controller/UserController')

var adminLogic = {
    getUser: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        UserController.queryById(id, function (err, rows) {
            if(err) {
                console.error(err);
                res.end(err)
            }
            _rs.data = rows;

            res.render('admin/user', _rs);
        })
    },
    saveUser: function (req, res, next) {
        var _rs = {};
        var data = req.body.data;

    }

};

module.exports = adminLogic;