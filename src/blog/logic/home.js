var async = require('async');

var articleController = require('../../admin/controller/article');
var articleCategoryController = require('../../admin/controller/articleCategory');

var logic = {
    goIndex: function (req, res, next) {
        res.render('home/index', {title: 'Express'});
    },
    goArticle: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        
        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                articleController.getLatestArticle(limit, function (err, rows) {
                    if(err) {
                        return callback(err)
                    }
                    callback(null, rows);
                })
            },
            categorys: function (callback) {
                articleCategoryController.categorys(function (err, rows) {
                    if(err) {
                        return callback(err)
                    }

                    callback(null,rows)
                })
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

            res.render('home/article', _rs);
        });
    },
    goCategory: function (req, res, next) {
        var _rs = {};
        var category_name = req.params.category_name;

        async.auto({
            latestArticles: function (callback) {
                var limit = 4;
                articleController.getLatestArticle(limit, function (err, rows) {
                    if(err) {
                        return callback(err)
                    }
                    callback(null, rows);
                })
            },
            categorys: function (callback) {
                articleCategoryController.categorys(function (err, rows) {
                    if(err) {
                        return callback(err)
                    }

                    callback(null,rows)
                })
            },
            articles: function (callback) {
                articleController.queryByCategoryName(category_name, function (err, rows) {
                    if(err) {
                        return callback(err)
                    }
                    callback(null,rows)

                })
            }
        }, function (err, rs) {
            if(err) {
                return console.error(err)
            }

            _rs.status = true;
            _rs.data = {};
            _rs.data.latestArticles = rs.latestArticles;
            _rs.data.categorys = rs.categorys;
            _rs.data.articles = rs.articles;
            _rs.data.category_name = category_name;

            res.render('home/category', _rs);
        })
    }

};

module.exports = logic;