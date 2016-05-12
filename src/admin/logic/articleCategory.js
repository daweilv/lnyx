var querystring = require('querystring');
var articleCategoryController = require('../controller/articleCategory');

var logic = {
    getArticleCategorys: function (req, res, next) {
        var _rs = {user:req.session.user};
        articleCategoryController.queryAll(function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }
            _rs.data = rows;
            res.render('admin/articleCategorys', _rs);
        })
    },
    getArticleCategory: function (req, res, next) {
        var _rs = {user:req.session.user};
        var id = req.params.id;
        if (id == 0) {
            _rs.data = {id: 0};
            return res.render('admin/articleCategory', _rs);
        }
        articleCategoryController.queryById(id, function (err, rows) {
            if (err) {
                console.error(err);
                return res.end(err)
            }

            if (rows.length > 0) {
                _rs.data = rows[0];
            } else {
                _rs.data = {};
            }

            res.render('admin/articleCategory', _rs);
        })
    },
    saveArticleCategory: function (req, res, next) {
        var _rs = {};
        var _model = querystring.parse(req.body._model);
        articleCategoryController.insertOrUpdate(_model, req, function (err, result) {
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
    deleteArticleCategory: function (req, res, next) {
        var _rs = {};
        var id = req.params.id;
        articleCategoryController.delete(id, req, function (err, result) {
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