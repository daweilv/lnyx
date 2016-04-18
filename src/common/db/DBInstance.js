/**
 * Created by david on 16/4/17.
 */
var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool(config.db);
pool.on('connection', function (connection) {
    console.log('pool.on==>connection');
});
pool.on('enqueue', function () {
    console.log('pool.on==>enqueue. Waiting for available connection slot');
});


var DBInstance = {
    query: function () {
        var args = [];
        var callback;
        var length = arguments.length;
        if(length == 0){
            throw new Error('arguments can not be null!')
        }

        if(typeof arguments[length-1] !== 'function'){
            throw new Error('last arguments must be function!')
        }
        for(var prop = 0; prop < length - 1; prop++) {
            args.push(arguments[prop])
        }
        callback = arguments[length-1];
        pool.getConnection(function (err, conn) {
            if (err) {
                return callback(err)
            }
            var DBCallback = function(err, rows, fields) {
                conn.release();
                callback(err, rows, fields);
            };
            args.push(DBCallback);
            conn.query.apply(conn,args)
        });
    }
};

module.exports = DBInstance;
module.exports.pool = pool;

