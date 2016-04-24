var fs = require('fs');

var data = '123213';
var writerStream = fs.createWriteStream('abc' + '.js');

writerStream.write(data, 'UTF8');
writerStream.end();
writerStream.on('finish', function () {
    console.log("写入完成。");
    //callback()
});

writerStream.on('error', function (err) {
    console.log(err.stack);
    //callback(err);
});/**
 * Created by david on 16/4/22.
 */
