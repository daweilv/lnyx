var path = require('path');
const spawn = require('child_process').spawn;
const tail = spawn('tail', ['-f', path.join(__dirname, '../test.log')]);
const moment = require('moment');
var Monitor = {
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
    timestamp: function () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    wrapMsg: function (buffer) {
        var timestamp = this.timestamp();
        var data;
        try {
            data = buffer.toString('UTF-8');
        } catch (err) {
            data = err.toString();
        }
        return timestamp + '    ' + data;
    }
}

module.exports = Monitor;