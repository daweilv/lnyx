var Tail = require('tail').Tail;


var app = {
    sendLog: function (connection) {
        var tail = new Tail("./test.log");

        tail.on("line", function (data) {
            connection.send(data);
        });

        tail.on("error", function (error) {
            connection.send(error);
        });
    }

}

module.exports = app;