var pool = require('../src/mysql-pool');
var StringUtil = require('../util/StringUtil');
var SessionUtil = require('../util/SessionUtil');

var UserController = {
    queryById: function query(id, cb) {
        pool.getConnection(function (err, conn) {
            conn.query('select * from f_user where delete_by is null and id = ?', id, function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    insertOrUpdate: function (model, cb) {
        if (model.id) {

            this.update(model, cb)
        } else {

            this.insert(model, cb);
        }
    },
    query: function (cb) {
        pool.getConnection(function (err, conn) {
            conn.query('select * from f_user where delete_by is null', function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    update: function update(model, cb) {
        model.update_at = StringUtil.getSqlTimeStamp();
        model.update_by = SessionUtil.getUserSession(req).id;
        pool.getConnection(function (err, conn) {
            conn.query('update f_user set ? where id = ?', [model, model.id], function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    insert: function insert(model, cb) {
        model.id = StringUtil.getId();
        model.create_at = StringUtil.getSqlTimeStamp();
        model.create_by = SessionUtil.getUserSession(req).id;
        pool.getConnection(function (err, conn) {
            conn.query('insert f_user set ?', [model, model.id], function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    delete: function delete_(id, cb) {
        var model = {
            delete_at: StringUtil.getSqlTimeStamp(),
            delete_by: SessionUtil.getUserSession(req).id
        };
        pool.getConnection(function (err, conn) {
            conn.query('update f_user set ? where id = ?', [model, id], function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    }

}
module.exports = UserController;