var pool = require('../src/mysql-pool');
var StringUtil = require('../util/StringUtil');
var SessionUtil = require('../util/SessionUtil');

var UserController = {
    queryByLogin: function (login,cb) {
        pool.getConnection(function (err, conn) {
            if (err) {
                return cb(err)
            }
            conn.query('select * from f_user where delete_by is null and login = ?', login, function (err, rows, fields) {
                conn.release();
                if (err) {
                    return cb(err)
                }
                cb(null, rows);
            });
        })
    },
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
        model.update_by = req.session.user.login;
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
        model.create_by = req.session.user.login;
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
            delete_by: req.session.user.login
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