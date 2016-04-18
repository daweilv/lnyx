var DBInstance = require('../src/common/db/DBInstance');
var config = require('../src/common/config');

var generator = {

    getTables: function (sql, values, callback) {
            DBInstance.query('select * from information_schema.tables where TABLE_SCHEMA = ?',config.db.database, function (err, rows, fields) {
                if (err) {
                    return callback(err)
                }
                callback(null, rows);
            });
    },
    getFullField: function () {
        var sql = 'show full fields from f_user';

    }
}
