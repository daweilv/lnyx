var mysql = require('mysql');

var config = require('../config');

var pool  = mysql.createPool({
    connectionLimit : config.db.connectionLimit,
    host            : config.db.host,
    user            : config.db.user,
    password        : config.db.password,
    database        : config.db.database
});

module.exports = pool;