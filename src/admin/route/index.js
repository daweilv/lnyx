var express = require('express');

var router = express.Router();

var auth = require('../../common/auth');
var adminLogic = require('../logic/admin');
var userLogic = require('../logic/user');
var articleLogic = require('../logic/article');
var articleCategoryLogic = require('../logic/articleCategory');
var loginLogic = require('../logic/login');
var UploadLogic = require('../logic/UploadLogic');

router.get('/admin/', auth.isLogin, adminLogic.goIndex);
router.get('/admin/index', auth.isLogin, adminLogic.goIndex);
router.get('/admin/login', loginLogic.goLogin);
router.post('/admin/login', loginLogic.login);
router.get('/admin/logout', loginLogic.logout);

router.get('/admin/users', auth.isLogin, userLogic.getUsers);
router.get('/admin/user/:id', auth.isLogin, userLogic.getUser);
router.post('/admin/user/', auth.isLogin, userLogic.saveUser);
router.delete('/admin/user/:id', auth.isLogin, userLogic.deleteUser);

router.get('/admin/articles', auth.isLogin, articleLogic.getArticles);
router.get('/admin/article/:id', auth.isLogin, articleLogic.getArticle);
router.post('/admin/article/', auth.isLogin, articleLogic.saveArticle);
router.delete('/admin/article/:id', auth.isLogin, articleLogic.deleteArticle);

router.get('/admin/articleCategorys', auth.isLogin, articleCategoryLogic.getArticleCategorys);
router.get('/admin/articleCategory/:id', auth.isLogin, articleCategoryLogic.getArticleCategory);
router.post('/admin/articleCategory/', auth.isLogin, articleCategoryLogic.saveArticleCategory);
router.delete('/admin/articleCategory/:id', auth.isLogin, articleCategoryLogic.deleteArticleCategory);

router.post('/admin/upload', auth.isLogin, UploadLogic.upload);

module.exports = router;