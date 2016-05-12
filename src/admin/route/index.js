var express = require('express');

var router = express.Router();

var auth = require('../../common/auth');
var adminLogic = require('../logic/admin');
var userLogic = require('../logic/user');
var articleLogic = require('../logic/article');
var articleCategoryLogic = require('../logic/articleCategory');
var loginLogic = require('../logic/login');

router.get('/', auth.isLogin, adminLogic.goIndex);
router.get('/index', auth.isLogin, adminLogic.goIndex);
router.get('/login', loginLogic.goLogin);
router.post('/login', loginLogic.login);
router.get('/logout', loginLogic.logout);

router.get('/users', auth.isLogin, userLogic.getUsers);
router.get('/user/:id', auth.isLogin, userLogic.getUser);
router.post('/user/', auth.isLogin, userLogic.saveUser);
router.delete('/user/:id', auth.isLogin, userLogic.deleteUser);

router.get('/articles', auth.isLogin, articleLogic.getArticles);
router.get('/article/:id', auth.isLogin, articleLogic.getArticle);
router.post('/article/', auth.isLogin, articleLogic.saveArticle);
router.delete('/article/:id', auth.isLogin, articleLogic.deleteArticle);

router.get('/articleCategorys', auth.isLogin, articleCategoryLogic.getArticleCategorys);
router.get('/articleCategory/:id', auth.isLogin, articleCategoryLogic.getArticleCategory);
router.post('/articleCategory/', auth.isLogin, articleCategoryLogic.saveArticleCategory);
router.delete('/articleCategory/:id', auth.isLogin, articleCategoryLogic.deleteArticleCategory);

module.exports = router;