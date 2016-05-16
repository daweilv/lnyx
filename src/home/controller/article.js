var DBInstance = require('../../common/db/DBInstance');

var controller = {
    queryById: function (id, callback) {
        DBInstance.query('select * from f_article where delete_by is null and id = ?', id, function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        });
    },
    queryBySeoURL : function (seo_url ,callback) {
        DBInstance.query('select * from f_article where delete_by is null and (seo_url = ? or id = ?)', [seo_url, seo_url], function (err, rows, fields) {
            if (err) {
                return callback(err)
            }
            callback(null, rows);
        });
    }
};

module.exports = controller;
