var querystring = require('querystring');
var async = require('async');
var UserController = require('../controller/UserController');

var AdminLogic = {
    login: function (req, res, next) {
        var _rs = {};
        var login = req.body.login;
        var password = req.body.password;

        async.auto({
            checkParams: function (callback, result) {
                if(!login || login==''){
                    return callback({msg:'用户名不能为空'})
                }
                if(!password || password==''){
                    return callback({msg:'密码不能为空'})
                }

                callback()
            },
            getUser: ['checkParams',function (callback,result) {
                UserController.queryByLogin(login,function (err, rows) {
                    if (err) {
                        console.error(err);
                        return callback({msg:'服务器异常，请稍后重试'})
                    }
                    if(rows.length == 0) {
                        return callback({msg:'账号未注册'})
                    }
                    var user = rows[0];

                    if(user.password != password){
                        return callback({msg:'密码错误'})
                    }
                    callback(null,{user:user});
                })
            }],
            putUser2Session: ['getUser',function (callback, result) {
                req.session.user = result.getUser.user;
                callback()
            }]
        }, function (err, result) {
            if(err){
                _rs.status = false;
                _rs.msg = err.msg;
                console.log(_rs);
                return res.json(_rs)
            }

            _rs.status = true;
            _rs.msg = '登录成功';
            _rs.data = {href:'/admin/index'};
            console.log(_rs);
            res.json(_rs)
        })
    },
    logout: function (req, res, next) {
        var _rs = {};
        delete req.session.user;
        _rs.status = true;
        _rs.msg = '注销成功';
        _rs.data = {href:'/admin/login'};
        console.log(_rs);
        res.json(_rs)
    },
    getIndex:function (req, res, next) {
        var _rs = {user:req.session.user};
        res.render('admin/index',_rs);
    },
    getUsers: function (req, res, next) {
        var _rs = {user:req.session.user};
        UserController.queryAll(function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }
            _rs.data = rows;
            res.render('admin/users', _rs);
        })
    },
    getUser: function (req, res, next) {
        var _rs = {user:req.session.user};
        var id = req.params.id;
        if (id == 0) {
            _rs.data = {id: 0};
            return res.render('admin/user', _rs);
        }
        UserController.queryById(id, function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }

            if (rows.length > 0) {
                _rs.data = rows[0];
            } else {
                _rs.data = {};
            }

            res.render('admin/user', _rs);
        })
    },
    saveUser: function (req, res, next) {
        var _rs = {};
        var _model = querystring.parse(req.body._model);
        UserController.insertOrUpdate(_model, req, function (err, result) {
            if (err) {
                _rs.status = false;
                _rs.error = err;
                return res.json(_rs)
            }
            _rs.data = _model;
            _rs.status = true;
            res.json(_rs);

        })
    },
    deleteUser: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        UserController.delete(id, req, function (err, result) {
            if (err) {
                _rs.status = false;
                _rs.error = err;
                return res.json(_rs)
            }
            _rs.data = {id:id};
            _rs.status = true;
            res.json(_rs);
        })
    }

};

module.exports = AdminLogic;