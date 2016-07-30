var express = require('express');
var router = express.Router();

var BlogLogic = require('../logic/BlogLogic');

router.get('/', BlogLogic.goIndex);
router.get('/article/:seo_url', BlogLogic.goArticle);
router.get('/category/:category_seo_url', BlogLogic.goCategory);

module.exports = router;