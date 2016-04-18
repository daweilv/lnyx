var DateUtil = require('./DateUtil');

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
        var s = DateUtil.getDate('YYYYMMDDHHmmssSS') + this.getRandomString(4);
        return s;
    }
};

module.exports = StringUtil;