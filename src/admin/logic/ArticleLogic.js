var async = require('async');
var querystring = require('querystring');

var ArticleController = require('../controller/ArticleController');
var ArticleCategoryController = require('../controller/ArticleCategoryController');

var ArticleLogic = {
    getArticles: function (req, res, next) {
        var _rs = {user: req.session.user};
        async.auto({
            categorys: function (callback) {
                ArticleCategoryController.categorys(function (err, result) {
                    if (err) {
                        return callback(err)
                    }
                    var categorysParis = {};
                    result.forEach(function (item) {
                        categorysParis[item.id] = item.name
                    });

                    callback(null, categorysParis)
                })
            },
            articles: function (callback) {
                ArticleController.queryAll(function (err, rows) {
                    if (err) {
                        return callback(err)
                    }
                    callback(null, rows)
                })
            }
        }, function (err, rs) {
            if (err) {
                return next(err);
            }
            _rs.categorys = rs.categorys;
            _rs.data = rs.articles;
            res.render('admin/articles', _rs);
        })
    },

    getArticle: function (req, res, next) {
        var _rs = {user: req.session.user};
        var id = req.params.id;

        async.auto({
            categorys: function (callback) {
                ArticleCategoryController.categorySelectTree(function (err, result) {
                    if (err) {
                        return callback(err)
                    }
                    callback(null, result)
                })
            },
            article: function (callback) {
                if (id == 0) {
                    callback(null, {id: 0})
                } else {
                    ArticleController.queryById(id, function (err, rows) {
                        if (err) {
                            return callback(err)
                        }

                        var article = {};
                        if (rows.length > 0) {
                            article = rows[0];
                        }
                        callback(null, article)
                    })
                }
            }
        }, function (err, rs) {
            if (err) {
                return next(err);
            }
            _rs.categorys = rs.categorys;
            _rs.data = rs.article;
            res.render('admin/article', _rs);
        })
    },

    saveArticle: function (req, res, next) {
        var _rs = {};
        var _model = querystring.parse(req.body._model);

        if (!_model.is_show_cover) {
            _model.is_show_cover = 0;
        }
        if (!_model.is_show_comment) {
            _model.is_show_comment = 0;
        }
        if (!_model.is_show) {
            _model.is_show = 0;
        }
        if (!_model.is_publish) {
            _model.is_publish = 0;
        }

        ArticleController.insertOrUpdate(_model, req, function (err, result) {
            if (err) {
                _rs.status = false;
                _rs.error = err;
                return res.json(_rs)
            }
            _rs.data = _model;
            _rs.status = true;
            res.json(_rs);

        })
    },

    deleteArticle: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        ArticleController.delete(id, req, function (err, result) {
            if (err) {
                _rs.status = false;
                _rs.error = err;
                return res.json(_rs)
            }
            _rs.data = {id: id};
            _rs.status = true;
            res.json(_rs);
        })
    }
};

module.exports = ArticleLogic;