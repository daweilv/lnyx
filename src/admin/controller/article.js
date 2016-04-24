var DBInstance = require('../../common/db/DBInstance');
var StringUtil = require('../../common/util/StringUtil');
var DateUtil = require('../../common/util/DateUtil');


var UserController = {
    queryAll: function (callback) {

        DBInstance.query('select * from f_article where delete_by is null', function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        });
    },
    queryById: function query(id, callback) {
        DBInstance.query('select * from f_article where delete_by is null and id = ?', id, function (err, rows, fields) {

            if (err) {
                return callback(err)
            }
            callback(null, rows);
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
        DBInstance.query('select * from f_article where delete_by is null', function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        });
    },
    update: function update(model, req, callback) {
        //todo change req to operate
        model.update_at = DateUtil.getSqlDate();
        model.update_by = req.session.user.login;
        DBInstance.query('update f_article set ? where id = ?', [model, model.id], function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, model);
        });
    },
    insert: function insert(model, req, callback) {
        model.id = StringUtil.getId();
        model.create_at = DateUtil.getSqlDate();
        model.create_by = req.session.user.login;
        DBInstance.query('insert f_article set ?', [model, model.id], function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, model);
        });
    },
    delete: function delete_(id, req, callback) {
        var model = {
            delete_at: DateUtil.getSqlDate(),
            delete_by: req.session.user.login
        };
        DBInstance.query('update f_article set ? where id = ?', [model, id], function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        });
    }
};

module.exports = UserController;
