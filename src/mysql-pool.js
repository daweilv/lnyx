var mysql = require('mysql');

var config = require('../config');

var pool  = mysql.createPool(config.db);

pool.on('connection', function (connection) {
    console.log('pool.on==>connection');
});
pool.on('enqueue', function () {
    console.log('pool.on==>enqueue. Waiting for available connection slot');
});

module.exports = pool;