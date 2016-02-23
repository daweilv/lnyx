var fs = require("fs");
var http = require('http');

var sourc_url = '/ueditor/upload/video/652007405793710080.mp4';
var options = {
    hostname: 'www.bstcine.com',
    path: sourc_url,
    headers: {
        "Referer": 'http://www.bstcine.com/product/d011453363119941rNYTmAlKmT'
    }
}


http.get(options, function (res) {
    var data = '';
    res.setEncoding('binary');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {

        fs.writeFile('./'+getUrlFileName(options.path), data, 'binary', function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('download finish');
            }
        });

    });

});


function getUrlFileName(url){
    var str = url.substring(url.lastIndexOf("/")+1,url.length);
    return str
}