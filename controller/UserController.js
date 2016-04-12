var pool = require('../src/mysql-pool');
var StringUtil = require('../util/StringUtil');
var SessionUtil = require('../util/SessionUtil');

var UserController = {
    queryAll: function (cb) {
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('select * from f_user where delete_by is null', function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    queryById: function query(id, cb) {
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('select * from f_user where delete_by is null and id = ?', id, function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    insertOrUpdate: function (model,req, cb) {
        if (model.id != 0) {
            this.update(model,req, cb)
        } else {
            this.insert(model,req, cb);
        }
    },
    query: function (cb) {
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('select * from f_user where delete_by is null', function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
    update: function update(model,req, cb) {
        model.update_at = StringUtil.getSqlTimeStamp();
        //todo req.usersession设置
        //model.update_by = SessionUtil.getUserSession(req).id;
        model.update_by = '1';
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('update f_user set ? where id = ?', [model, model.id], function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, model);
            });
        })
    },
    insert: function insert(model,req, cb) {
        model.id = StringUtil.getId();
        model.create_at = StringUtil.getSqlTimeStamp();
        //todo req.usersession设置
        //model.create_by = SessionUtil.getUserSession(req).id;
        model.create_by = '1';
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('insert f_user set ?', [model, model.id], function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, model);
            });
        })
    },
    delete: function delete_(id,req, cb) {
        var model = {
            delete_at: StringUtil.getSqlTimeStamp(),
            //todo req.usersession设置
            //delete_by: SessionUtil.getUserSession(req).id
            delete_by: '1'
        };
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
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