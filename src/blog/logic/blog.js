var async = require('async');

var articleController = require('../../admin/controller/article');
var articleCategoryController = require('../../admin/controller/articleCategory');
var CommonConverter = require('../../common/util/CommonConverter');

var logic = {
    goIndex: function (req, res, next) {
        var _rs = {};

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                articleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                articleCategoryController.categorys(callback)
            },
            articles: function (callback) {
                articleController.queryAll(callback)
            }
        }, function (err, rs) {
            if(err) {
                return console.error(err)
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.categorys = rs.categorys;
            _rs.data.categorysPair = CommonConverter.Array2Obj(rs.categorys, 'id', 'name');
            _rs.data.articles = rs.articles;
            _rs.data.current_category_id = 0;

            res.render('blog/category', _rs);
        })
    },
    goArticle: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        
        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                articleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                articleCategoryController.categorys(callback)
            },
            article: function (callback) {
                articleController.queryBySeoURL(id, function (err, rows) {
                    if(err) {
                        return callback(err)
                    }

                    if(rows && rows.length > 0 ) {
                        var article = rows[0];
                        callback(null, article)
                    }
                })
            }
        }, function (err, rs) {
            if(err){
                return console.error(err)
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.article = rs.article;
            _rs.data.categorys = rs.categorys;
            _rs.data.category_id = rs.article.article_category_id;
            _rs.data.current_category_id = rs.article.article_category_id;

            res.render('blog/article', _rs);
        });
    },
    goCategory: function (req, res, next) {
        var _rs = {};
        var category_name = req.params.category_name;

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                articleController.getLatestArticle(limit, callback)
            },
            categorys: function (callback) {
                articleCategoryController.categorys(callback)
            },
            articles: function (callback) {
                articleController.queryByCategoryName(category_name, callback)
            }
        }, function (err, rs) {
            if(err) {
                return console.error(err)
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.categorys = rs.categorys;
            _rs.data.categorysPair = CommonConverter.Array2Obj(rs.categorys, 'id', 'name');
            _rs.data.articles = rs.articles;
            _rs.data.current_category_id = CommonConverter.getIdByName(rs.categorys, category_name);

            res.render('blog/category', _rs);
        })
    }

};

module.exports = logic;