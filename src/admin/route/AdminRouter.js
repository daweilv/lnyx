var express = require('express');

var router = express.Router();

var AuthLogic = require('../../common/logic/AuthLogic');
var AdminLogic = require('../logic/AdminLogic');
var UserLogic = require('../logic/UserLogic');
var ArticleLogic = require('../logic/ArticleLogic');
var ArticleCategoryLogic = require('../logic/ArticleCategoryLogic');
var LoginLogic = require('../logic/LoginLogic');
var UploadLogic = require('../logic/UploadLogic');

router.get('/admin/', AuthLogic.isLogin, AdminLogic.goIndex);
router.get('/admin/index', AuthLogic.isLogin, AdminLogic.goIndex);
router.get('/admin/login', LoginLogic.goLogin);
router.post('/admin/login', LoginLogic.login);
router.get('/admin/logout', LoginLogic.logout);

router.get('/admin/users', AuthLogic.isLogin, UserLogic.getUsers);
router.get('/admin/user/:id', AuthLogic.isLogin, UserLogic.getUser);
router.post('/admin/user/', AuthLogic.isLogin, UserLogic.saveUser);
router.delete('/admin/user/:id', AuthLogic.isLogin, UserLogic.deleteUser);

router.get('/admin/articles', AuthLogic.isLogin, ArticleLogic.getArticles);
router.get('/admin/article/:id', AuthLogic.isLogin, ArticleLogic.getArticle);
router.post('/admin/article/', AuthLogic.isLogin, ArticleLogic.saveArticle);
router.delete('/admin/article/:id', AuthLogic.isLogin, ArticleLogic.deleteArticle);

router.get('/admin/articleCategorys', AuthLogic.isLogin, ArticleCategoryLogic.getArticleCategorys);
router.get('/admin/articleCategory/:id', AuthLogic.isLogin, ArticleCategoryLogic.getArticleCategory);
router.post('/admin/articleCategory/', AuthLogic.isLogin, ArticleCategoryLogic.saveArticleCategory);
router.delete('/admin/articleCategory/:id', AuthLogic.isLogin, ArticleCategoryLogic.deleteArticleCategory);

router.post('/admin/upload', AuthLogic.isLogin, UploadLogic.upload);

module.exports = router;