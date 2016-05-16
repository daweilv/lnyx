var config = require('../../common/config');
var formidable = require('formidable');

var logic = {

    upload: function (req, res, next) {
        var _rs = {};

        var form = new formidable.IncomingForm();   //创建上传表单
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = config.path.file;
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 1000 * 1024 * 1024;   //文件大小

        form.parse(req, function (err, fields, files) {
            if (err) {
                console.error(err);
                _rs.status = false;
                _rs.msg = 'formError';
                res.end(uploadCallback(_rs));
                return;
            }

            var imgPath = files.img.path.replace(config.path.webroot,'');

            _rs.status = true;
            _rs.data = {imgPath:imgPath};

            res.end(uploadCallback(_rs));

            function uploadCallback(rs){
                return '<script>parent.o.uploadCallback('+JSON.stringify(rs)+')</script>'
            }
        })
    }

};

module.exports = logic;