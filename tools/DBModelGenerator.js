var pool = require('../src/mysql-pool');

var generator = {

    getTables: function (sql, values, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                return callback(err)
            }
            conn.query('select * from information_schema.tables where TABLE_SCHEMA = ?',config.db.database, function (err, rows, fields) {
                conn.release();
                if (err) {
                    return callback(err)
                }
                callback(null, rows);
            });
        })
    }
}
