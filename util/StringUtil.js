var moment = require('moment');

var StringUtil = {
    getRandomString: function (length) {
        if (!length) length = 10;
        var s = '0123456789';
        var rand = '';
        for (var i = 0; i < length; i++) {
            rand += s.charAt(Math.floor(Math.random() * s.length))
        }
        return rand;
    },
    getId: function getId() {
        var s = moment().format('YYYYMMDDHHmmssSS') + this.getRandomString(4);
        return s;
    },
    getTimeStamp: function getTimeStamp(fmt) {
        if(!fmt) fmt = 'YYYYMMDDHHmmssSS';
        var s = moment().format('YYYYMMDDHHmmssSS');
        return s;
    },
    getSqlTimeStamp: function getSqlTimeStamp() {
        var s = moment().format('YYYY-MM-DD HH:mm:ss');
        return s;
    }
};

module.exports = StringUtil;