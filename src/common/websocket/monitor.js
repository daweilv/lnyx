var spawn = require('child_process').spawn;
var config = require('../config');
var tail = spawn('tail', ['-f', config.path.log]);
var DateUtil = require('../util/DateUtil');

var monitor = {
    sendLog: function (connection) {
        var that = this;
        tail.stdout.on('data', function (buffer) {
            connection.send(that.wrapMsg(buffer));
        });

        tail.stderr.on('data', function (buffer) {
            connection.send(that.wrapMsg(buffer));
        });

        tail.on('close', function (buffer) {
            connection.send(that.wrapMsg(buffer));
        });

        process.on('exit', function () {
            tail.kill();
        });
    },
    wrapMsg: function (buffer) {
        var timestamp = DateUtil.getDate();
        var data;
        try {
            data = buffer.toString('UTF-8');
        } catch (err) {
            data = err.toString();
        }
        return timestamp + '    ' + data;
    }
};

module.exports = monitor;