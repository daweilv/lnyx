var async = require('async');

var ArticleController = require('../controller/ArticleController');
var ArticleCategoryController = require('../controller/ArticleCategoryController');
var CommonConverter = require('../../common/util/CommonConverter');

var BlogLogic = {

    goIndex: function (req, res, next) {
        var _rs = {};

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                ArticleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                ArticleCategoryController.categorys(callback)
            },
            articles: function (callback) {
                ArticleController.queryAll(callback)
            }
        }, function (err, rs) {
            if(err) {
                return next(err)
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.categorys = rs.categorys;
            _rs.data.articles = rs.articles;
            _rs.data.current_category_id = 0;

            res.render('blog/category', _rs);
        })
    },

    goCategory: function (req, res, next) {
        var _rs = {};
        var category_seo_url = req.params.category_seo_url;

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                ArticleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                ArticleCategoryController.categorys(callback)
            },
            articles: function (callback) {
                ArticleController.queryAllByCategorySeoUrl(category_seo_url, callback)
            }
        }, function (err, rs) {
            if(err) {
                return next(err);
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.categorys = rs.categorys;
            _rs.data.articles = rs.articles;
            _rs.data.current_category_id = CommonConverter.getIdBySeoUrl(rs.categorys, category_seo_url);

            res.render('blog/category', _rs);
        })
    },

    goArticle: function (req, res, next) {
        var _rs = {};
        var seo_url = req.params.seo_url;

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                ArticleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                ArticleCategoryController.categorys(callback)
            },
            article: function (callback) {
                ArticleController.queryBySeoURL(seo_url, function (err, rows) {
                    if(err) {
                        return callback(err)
                    }
                    if(rows && rows.length > 0 ) {
                        var article = rows[0];
                        callback(null, article)
                    }else{
                        var err_ = new Error();
                        err_.status = 404;
                        err_.name = 'noMatchResult';
                        err_.message = 'noMatchResult';
                        callback(err_)
                    }
                })
            }
        }, function (err, rs) {
            if(err){
                return next(err);
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.article = rs.article;
            _rs.data.categorys = rs.categorys;
            //_rs.data.category_id = rs.article.article_category_id;
            _rs.data.current_category_id = rs.article.article_category_id;

            res.render('blog/article', _rs);
        });
    }

};

module.exports = BlogLogic;