var a = "abcdefghijklmnopqrstuvwxyz"
var b = "abcdefghijklmnopqrstuvwxyz"
var c = "abcdefghijklmnopqrstuvwxyz"
var d = "abcdefghijklmnopqrstuvwxyz"


for (var ai = 0; ai < a.length; ai++) {
    var strs = [];
    for (var bi = 0; bi < b.length; bi++) {
        for (var ci = 0; ci < c.length; ci++) {
            for (var di = 0; di < d.length; di++) {
                var str = a[ai] + b[bi] + c[ci] + d[di]
                strs.push(str);
            }
        }
    }
    var fs = require("fs");

    fs.writeFile(a[ai]+'.txt', strs.join('\n'), function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });
}
