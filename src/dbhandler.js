/**
 * Created by lvdw on 16/4/14.
 */
var pool = require('../src/mysql-pool');

var dbhandler = {
    exec: function () {
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

        function dbcallback(err, rows, fields) {
            conn.release();
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        }
        args.push(dbcallback);

        pool.getConnection(function (err, conn) {
            if (err) {
                return callback(err)
            }
            query.call(conn,args);
        })
    }
};

module.exports = dbhandler;