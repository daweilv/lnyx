var DBInstance = require('../../common/db/DBInstance');
var StringUtil = require('../../common/util/StringUtil');
var DateUtil = require('../../common/util/DateUtil');


var ArticleController = {
    queryAll: function (callback) {
        DBInstance.query('select * from f_article where delete_by is null order by create_at desc', function (err, rows) {
            callback(err, rows);
        });
    },
    queryById: function (id, callback) {
        DBInstance.query('select * from f_article where delete_by is null and id = ?', id, function (err, rows) {
            callback(err, rows);
        });
    },
    queryBySeoURL : function (seo_url ,callback) {
        DBInstance.query('select * from f_article where delete_by is null and (seo_url = ? or id = ?)', [seo_url, seo_url], function (err, rows) {
            callback(err, rows);
        });
    },
    queryByCategoryName: function (category_name, callback) {
        DBInstance.query('select id,name,seo_url from f_article where delete_by is null and article_category_id = (select id from f_article_category where name = ?)', category_name, function (err, rows) {
            callback(err, rows);
        });
    },
    insertOrUpdate: function (model, req, callback) {
        if (model.id != 0) {
            this.update(model, req, callback)
        } else {
            this.insert(model, req, callback);
        }
    },
    query: function (callback) {
        DBInstance.query('select * from f_article where delete_by is null', function (err, rows) {
            callback(err, rows);
        });
    },
    update: function (model, req, callback) {
        model.update_at = DateUtil.getSqlDate();
        model.update_by = req.session.user.login;
        DBInstance.query('update f_article set ? where id = ?', [model, model.id], function (err, rows) {
            if (err) {
                return callback(err)
            }
            callback(null, model);
        });
    },
    insert: function (model, req, callback) {
        model.id = StringUtil.getId();
        model.create_at = DateUtil.getSqlDate();
        model.create_by = req.session.user.login;
        DBInstance.query('insert f_article set ?', model, function (err, rows) {
            callback(err, model);
        });
    },
    delete: function (id, req, callback) {
        var model = {
            delete_at: DateUtil.getSqlDate(),
            delete_by: req.session.user.login
        };
        DBInstance.query('update f_article set ? where id = ?', [model, id], function (err, rows) {
            callback(err, rows);
        });
    },
    getLatestArticle: function (limit, callback) {
        DBInstance.query('select id,seo_url,name from f_article where delete_by is null order by create_at desc limit ?', limit, function (err, rows) {
            callback(err, rows);
        });
    }
};

module.exports = ArticleController;
