var express = require('express');
var router = express.Router();

var AdminLogic = require('../logic/AdminLogic')

router.get('/', systemFilter, function (req, res, next) {
    res.redirect('/admin/index');
});

router.get('/login', function (req, res, next) {
    res.render('admin/login', {title: '2222'});
});

router.post('/login', function (req, res, next) {
    AdminLogic.login(req, res, next);
});

router.get('/logout', function (req, res, next) {
    AdminLogic.logout(req, res, next);
});

router.get('/index', systemFilter, function (req, res, next) {
    AdminLogic.getIndex(req, res, next);
});

router.get('/users', systemFilter, function (req, res, next) {
    AdminLogic.getUsers(req, res, next);
});

router.get('/user/:id', systemFilter, function (req, res, next) {
    AdminLogic.getUser(req, res, next)
});

router.post('/user/', function (req, res, next) {
    AdminLogic.saveUser(req, res, next)
});

router.delete('/user/:id', function (req, res, next) {
    AdminLogic.deleteUser(req, res, next)
})

function systemFilter(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin/login')
    } else {
        next()
    }
}

module.exports = router;