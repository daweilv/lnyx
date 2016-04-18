var moment = require('moment');

var DateUtil = {
    getDate: function (fmt) {
        if(!fmt) fmt = 'YYYY-MM-DD HH:mm:ss';
        var s = moment().format(fmt);
        return s;
    },
    getSqlDate: function () {
        var s = moment().format('YYYY-MM-DD HH:mm:ss');
        return s;
    }
};

module.exports = DateUtil;