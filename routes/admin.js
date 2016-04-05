var express = require('express');
var router = express.Router();

var AdminLogic = require('../logic/AdminLogic')

router.get('/', function (req, res, next) {
    res.redirect('/admin/index');
});

router.get('/index', function (req, res, next) {
    res.render('admin/index', { title: '2222' });
});

router.get('/users', function (req, res, next) {
    res.render('admin/users', { title: '用户列表' });
});

router.get('/user/:id', function (req, res, next) {
    AdminLogic.getUser(req, res, next)
});

router.post('/user/', function (req, res, next) {
    AdminLogic.saveUser(req, res, next)
});

module.exports = router;