var converter = {
    Array2Obj: function (arr, key, v) {
        var obj = {};
        arr.forEach(function (item,i) {
            if(key){
                obj[item[key]] = item[v]
            }else{
                obj[i] = item;
            }
        });
        return obj;
    }

};

module.exports = converter;