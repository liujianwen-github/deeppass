var fs=require('fs');
var filename="userData.json";
var result=JSON.parse(fs.readFileSync( file));
//操作对象

function fileWrite(coors){
	fs.writeFileSync(filename, JSON.stringify(coors));
}