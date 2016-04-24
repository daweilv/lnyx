var express = require('express');
var router = express.Router();

var auth = require('../../common/auth');
var adminLogic = require('../logic/admin');
var userLogic = require('../logic/user');
var articleLogic = require('../logic/article');
var loginLogic = require('../logic/login');

router.get('/', auth.isLogin, adminLogic.goIndex);
router.get('/index', auth.isLogin, adminLogic.goIndex);
router.get('/login', loginLogic.goLogin);
router.post('/login', loginLogic.login);
router.get('/logout', loginLogic.logout);
router.get('/users', auth.isLogin, userLogic.getUsers);
router.get('/user/:id', auth.isLogin, userLogic.getUser);
router.post('/user/', userLogic.saveUser);
router.delete('/user/:id', userLogic.deleteUser);
router.get('/articles', auth.isLogin, articleLogic.getArticles);
router.get('/article/:id', auth.isLogin, articleLogic.getArticle);
router.post('/article/', articleLogic.saveArticle);
router.delete('/article/:id', articleLogic.deleteArticle);

module.exports = router;