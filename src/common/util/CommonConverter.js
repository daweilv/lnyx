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
    },
    getIdByName: function (objs, name) {
        var id;
        for (var i = 0; i < objs.length; i++){
            var obj = objs[i];
            if(obj.name == name){
                id = obj.id;
                break;
            }
        }
        return id;
    }

};

module.exports = converter;