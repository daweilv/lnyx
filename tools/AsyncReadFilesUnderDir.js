var fs = require("fs");
var path = require("path");
var async = require("async");


var test = {
    list: [],
    execute: function (file_path, callback) {
        var that = this;
        test.search(file_path, function () {
            callback(that.list)
        });
    },
    search: function (file_path, callback) {
        var that = this;
        fs.readdir(file_path, function (error, files) {
            async.each(files, function (file, callback) {
                var ph = path.join(file_path, file);
                fs.stat(ph, function (err, stats) {
                    if (stats.isFile()) {
                        that.list.push(ph);
                        callback();
                    } else if (stats.isDirectory()) {
                        that.search(ph, callback);
                    }
                });
            }, function (err, results) {
                callback()
            })
        });
    }
};


var file_path_ = "/work/project/cine/cine/tmp";
test.execute(file_path_, function (rs) {
    console.log(rs)
})



