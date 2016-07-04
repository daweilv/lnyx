var config = require('../../common/config');
var formidable = require('formidable');

var logic = {

    upload: function (req, res, next) {
        var _rs = {};

        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = config.path.file;
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 1000 * 1024 * 1024; //文件大小

        form.parse(req, function (err, fields, files) {
            var callback = fields.callback;
            var type = fields.type;
            if (err) {
                console.error(err);
                _rs.status = false;
                _rs.msg = 'formError';
                res.end(uploadCallback(callback, _rs));
                return;
            }

            var filePath = files.file.path.replace(config.path.webroot, '');

            var file = {
                name: files.file.name,
                path: filePath
            };

            _rs.status = true;
            _rs.data = {
                file: file
            };
            if (type) {
                _rs.data.type = type;
            }

            res.end(uploadCallback(callback, _rs));

            function uploadCallback(callback, rs) {
                return '<script>parent.' + callback + '(' + JSON.stringify(rs) + ')</script>'
            }
        })
    }

};

module.exports = logic;