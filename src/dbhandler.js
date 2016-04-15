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
        callback = arguments[length-1];
        pool.getConnection(function (err, conn) {
            if (err) {
                return callback(err)
            }
            var dbcallback = function(err, rows, fields) {
                conn.release();
                callback(err, rows, fields);
            }

            args.push(dbcallback);

            //var strs = [];
            //for(var key in args){
            //    strs.push('args['+key+']')
            //}
            //
            //var fn = 'conn.query('+strs.toString()+')'
            //eval(fn);
            conn.query.apply(conn,args)

        })
    }
};

module.exports = dbhandler;