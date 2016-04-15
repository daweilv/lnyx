function query(){
    for(var k in arguments){
        console.log(k)
        console.log(arguments[k])
    }
}
var args = ['a','b','c','d']//该数组有不定数量的元素，元素可能是方法、字符串等等

var strs = [];
for(var key in args){
    strs.push('args['+key+']')
}
var fn = 'query('+strs.toString()+')'
eval(fn);


//query.apply(null,args)