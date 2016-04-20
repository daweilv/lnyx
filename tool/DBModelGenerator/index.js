var fs = require("fs");
var ejs = require('ejs');
var async = require('async');

var DBInstance = require('../../src/common/db/DBInstance');
var config = require('../../src/common/config');

var generator = {


    exec: function () {
        async.auto({
            getTables: function (callback) {
                getTables(function (err, rs) {
                    if (err) {
                        return callback(err)
                    }

                    var tables = [];
                    rs.forEach(function (table) {
                        tables.push(table.TABLE_NAME)
                    });

                    callback(null, tables);
                })
            },
            table: ['getTables', function (result, callback) {
                var tables = result.getTables;

                async.each(tables, function (table, callback) {
                    getTable(table, callback)
                }, function (err) {
                    if (err) {
                        return callback(err)
                    }

                    callback()
                })


            }]


        }, function (err, result) {
            if(err){
                console.log(err)
            }
            console.log('done')

        })
    }


}



function getTables(callback) {
    DBInstance.query('select * from information_schema.tables where TABLE_SCHEMA = ?', config.db.database, function (err, rows, fields) {
        if (err) {
            return callback(err)
        }
        callback(null, rows);
    });
}


function getTable(table, callback) {
    async.auto({
        getFullFieldOfTable: function (callback) {
            var sql = 'show full fields from ' + table;
            DBInstance.query(sql, function (err, rows, fields) {
                if (err) {
                    return callback(err)
                }
                callback(null, rows);
            });
        },
        convertTableField2Model: ['getFullFieldOfTable', function (result, callback) {

            var table_name = table;
            var  _fields = result.getFullFieldOfTable;
            var fields = [];
            var model = table_name + 'Model';
            model = function () {

            };

            try{
                 _fields.forEach(function (field) {
                    var commentRegex = /\{(.+)\}/;
                    var result;
                    if ((result = commentRegex.exec(field.Comment)) != null) {
                        field.Comment = field.Comment.replace(result[0], '');
                        field._inputType = 'select';
                        var props = result[1].split(',');
                        var obj = {};
                        props.forEach(function (prop) {
                            var pairs = prop.split(':');
                            obj[pairs[0]] = pairs[1];
                        });
                        field._inputValue = obj;
                    }

                     fields.push(copyObj(field));
                });
            }catch(err){
                return callback(err)
            }


            model.fields = fields;
            //model.prototype.fields = fields;

            callback(null, model);
        }],
        writeIntoFile: ['convertTableField2Model',function (result,callback) {
            console.log(JSON.stringify(result.convertTableField2Model.fields))
            callback()
        }]
    }, function (err, rs) {
        if(err){
            return callback(err)
        }

        callback()
    })

}


function writeIntoFile(model, callback) {
    var data = JSON.stringify(model);
    var model_name = model.toString();

    var writerStream = fs.createWriteStream(model_name + '.js');

    writerStream.write(data, 'UTF8');
    writerStream.end();
    writerStream.on('finish', function () {
        console.log("写入完成。");
        callback()
    });

    writerStream.on('error', function (err) {
        console.log(err.stack);
        callback(err);
    });

}
//
//generator.getFullFieldOfTable('f_user', function (err, rs) {
//    console.log(err, rs)
//})
function copyObj(obj){
    var outobj = {};
    for(var prop in obj){
        outobj[prop]  = obj[prop];
    }
    return outobj;
}


generator.exec()