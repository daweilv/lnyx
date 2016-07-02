//var reg = new RegExp('a');
var reg = new RegExp('^(\n*)[\\s\\S]*(\n*)$','g');
//var reg = new RegExp('[\\s\\S]*','gm');
//var reg = /[\s\S]*/gm;
var a = "\n\nad\nasdasdada\nsdasd\n";

var result = a.match(reg);


