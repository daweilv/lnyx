var express = require('express');
var router = express.Router();

var auth = require('../../common/auth');
var homeLogic = require('../logic/home');

router.get('/', homeLogic.goIndex);
router.get('/article/:id', homeLogic.goArticle);
router.get('/category/:category_name', homeLogic.goCategory);

module.exports = router;