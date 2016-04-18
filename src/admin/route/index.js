var express = require('express');
var router = express.Router();

var auth = require('../../common/auth');
var adminLogic = require('../logic/admin');
var userLogic = require('../logic/user');
var loginLogic = require('../logic/login');

router.get('/', auth.isLogin, adminLogic.goIndex);
router.get('/login', loginLogic.goLogin);
router.post('/login', loginLogic.login);
router.get('/logout', loginLogic.logout);
router.get('/index', auth.isLogin, adminLogic.goIndex);
router.get('/users', auth.isLogin, userLogic.getUsers);
router.get('/user/:id', auth.isLogin, userLogic.getUser);
router.post('/user/', userLogic.saveUser);
router.delete('/user/:id', userLogic.deleteUser);

module.exports = router;