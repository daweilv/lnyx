var querystring = require('querystring');
var ArticleController = require('../controller/article');

var logic = {
    getArticles: function (req, res, next) {
        var _rs = {user:req.session.user};
        ArticleController.queryAll(function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }
            _rs.data = rows;
            res.render('admin/articles', _rs);
        })
    },
    getArticle: function (req, res, next) {
        var _rs = {user:req.session.user};
        var id = req.params.id;
        if (id == 0) {
            _rs.data = {id: 0};
            return res.render('admin/article', _rs);
        }
        ArticleController.queryById(id, function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }

            if (rows.length > 0) {
                _rs.data = rows[0];
            } else {
                _rs.data = {};
            }

            res.render('admin/article', _rs);
        })
    },
    saveArticle: function (req, res, next) {
        var _rs = {};
        var _model = querystring.parse(req.body._model);
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
            _rs.data = {id:id};
            _rs.status = true;
            res.json(_rs);
        })
    }
};

module.exports = logic;