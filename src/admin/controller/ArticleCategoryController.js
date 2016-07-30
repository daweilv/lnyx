/**
 * Created by david on 16/5/12.
 */
var DBInstance = require('../../common/db/DBInstance');
var StringUtil = require('../../common/util/StringUtil');
var DateUtil = require('../../common/util/DateUtil');

var ArticleCategoryLogic = {
    queryAll: function (callback) {
        DBInstance.query('select * from f_article_category where delete_by is null', function (err, rows) {
            callback(err, rows);
        });
    },

    queryById: function query(id, callback) {
        DBInstance.query('select * from f_article_category where delete_by is null and id = ?', id, function (err, rows) {
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
        DBInstance.query('select * from f_article_category where delete_by is null', function (err, rows) {
            callback(err, rows);
        });
    },

    update: function update(model, req, callback) {
        //todo change req to operate
        model.update_at = DateUtil.getSqlDate();
        model.update_by = req.session.user.login;
        DBInstance.query('update f_article_category set ? where id = ?', [model, model.id], function (err, rows) {
            callback(err, model);
        });
    },

    insert: function insert(model, req, callback) {
        model.id = StringUtil.getId();
        model.create_at = DateUtil.getSqlDate();
        model.create_by = req.session.user.login;
        DBInstance.query('insert f_article_category set ?', [model, model.id], function (err, rows) {
            callback(err, model);
        });
    },

    delete: function delete_(id, req, callback) {
        var model = {
            delete_at: DateUtil.getSqlDate(),
            delete_by: req.session.user.login
        };
        DBInstance.query('update f_article_category set ? where id = ?', [model, id], function (err, rows) {
            callback(err, rows);
        });
    },

    categorySelectTree: function (callback) {
        DBInstance.query('select * from f_article_category where delete_by is null order by seq', function (err, rows) {
            if (err) {
                return callback(err)
            }
            var categorys = [];
            if (rows.length > 0) {
                categorys = buildSelectTree(rows, 0, 0)
            }

            callback(null, categorys)
        })

        function buildSelectTree(categorys, parent_id, level) {
            var arr = [];
            categorys.forEach(function (item) {
                if (item.parent_id == parent_id) {
                    item.name = selectTreePrefix(level) + item.name;
                    arr.push(item);
                    arr = arr.concat(buildSelectTree(categorys, item.id, level + 1))
                }
            });
            return arr;
        }

        function selectTreePrefix(level) {
            var s = "";
            for (var i = 0; i < level; i++) {
                s += "　";
            }
            if (level > 0) {
                s += "└"
            }
            return s;
        }
    },

    categorys : function (callback) {
        DBInstance.query('select * from f_article_category where delete_by is null order by seq', function (err, rows) {
            callback(err,rows)
        })
    }
};

module.exports = ArticleCategoryLogic;
