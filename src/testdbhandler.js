var dbhandler = require('./dbhandler');

dbhandler.exec('select * from f_user', function (err, rows, fields) {
    console.log(err)
    console.log(rows)
    console.log(fields)
})