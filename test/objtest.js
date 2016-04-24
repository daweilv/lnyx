var str = '0:不显示,1:显示';

var props  = str.split(',');

var obj = {};
props.forEach(function (prop) {
    var ps = prop.split(':');

    obj[ps[0]] = ps[1];
})

var arr = [];
arr.push(obj)
arr.push(obj)

console.log(arr)