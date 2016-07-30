var async = require('async');
var UserController = require('../controller/UserController');

var LoginLogic = {
    goLogin: function (req, res, next) {
        res.render('admin/login', {title: '登录'});
    },

    login: function (req, res, next) {
        var _rs = {};
        var login = req.body.login;
        var password = req.body.password;

        async.auto({
            checkParams: function (callback) {
                if (!login || login == '') {
                    return callback({msg: '用户名不能为空'})
                }
                if (!password || password == '') {
                    return callback({msg: '密码不能为空'})
                }

                callback()
            },
            getUser: ['checkParams', function (result,callback) {
                UserController.queryByLogin(login, function (err, rows) {
                    if (err) {
                        console.error(err);
                        return callback({msg: '服务器异常，请稍后重试'})
                    }
                    if (rows.length == 0) {
                        return callback({msg: '账号未注册'})
                    }
                    var user = rows[0];

                    if (user.password != password) {
                        return callback({msg: '密码错误'})
                    }
                    callback(null, {user: user});
                })
            }],
            putUser2Session: ['getUser', function (result,callback) {
                req.session.user = result.getUser.user;
                callback()
            }]
        }, function (err, result) {
            if (err) {
                _rs.status = false;
                _rs.msg = err.msg;
                console.log(_rs);
                return res.json(_rs)
            }

            _rs.status = true;
            _rs.msg = '登录成功';
            _rs.data = {href: '/admin/articles'};
            res.json(_rs)
        })
    },

    logout: function (req, res, next) {
        var _rs = {};
        delete req.session.user;
        _rs.status = true;
        _rs.msg = '注销成功';
        _rs.data = {href: '/admin/login'};
        console.log(_rs);
        res.json(_rs)
    }
};

module.exports = LoginLogic;