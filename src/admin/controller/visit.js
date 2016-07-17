var DBInstance = require('../../common/db/DBInstance');
var StringUtil = require('../../common/util/StringUtil');
var DateUtil = require('../../common/util/DateUtil');


var VisitController = {
    queryAll: function (callback) {
        DBInstance.query('select * from f_visit order by view_at desc', function (err, rows) {
            callback(err, rows);
        });
    },
    queryById: function (id, callback) {
        DBInstance.query('select * from f_visit where id = ?', id, function (err, rows) {
            callback(err, rows);
        });
    },
    insertOrUpdate: function (model, callback) {
        if (model.id != 0) {
            this.update(model, callback)
        } else {
            this.insert(model, callback);
        }
    },
    query: function (callback) {
        DBInstance.query('select * from f_visit', function (err, rows) {
            callback(err, rows);
        });
    },
    update: function (model, req, callback) {
        DBInstance.query('update f_visit set ? where id = ?', [model, model.id], function (err, rows) {
            if (err) {
                return callback(err)
            }
            callback(null, model);
        });
    },
    insert: function (model, callback) {
        model.id = StringUtil.getId();
        model.view_at = DateUtil.getSqlDate();
        DBInstance.query('insert f_visit set ?', model, function (err, rows) {
            callback(err, model);
        });
    },
    delete: function (id, req, callback) {
        DBInstance.query('delete f_visit where id = ?', id, function (err, rows) {
            callback(err, rows);
        });
    }
};

module.exports = VisitController;
