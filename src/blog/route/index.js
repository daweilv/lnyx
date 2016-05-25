var express = require('express');
var router = express.Router();

var auth = require('../../common/auth');
var blogLogic = require('../logic/blog');

router.get('/', blogLogic.goIndex);
router.get('/article/:id', blogLogic.goArticle);
router.get('/category/:category_name', blogLogic.goCategory);

module.exports = router;