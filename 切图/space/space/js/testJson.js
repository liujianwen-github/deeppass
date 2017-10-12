var fs=require('fs');
var file="userData.json";
var result=JSON.parse(fs.readFileSync( file));
var express=require('express');
var app=express();
//操作对象

app.post('../testJson.html', function(req, res, next){
    // xml string
    console.log('xmlDoc:', req.body.xml);
    res.json(req.body.xml);
});



//
var coors = {'Data':[]};
    coors.Data[0]={
    	id:'eererererererererer',
    	name:'liming'
    };
    coors.Data[1]={
    	id:'eererererererererer',
    	name:'bbbb'
    };
    coors.Data[2]={
    	id:'eererererererererer',
    	name:'bbbb'
    };
    coors.Data[3]={
    	id:'eererererererererer',
    	name:'bbbb'
    };
//填充coors中内容
var filename = "userData.json";
 fs.writeFileSync(filename, JSON.stringify(coors));
 //对象嵌套
 var fs = require('fs');
var fileDirectory = "../js";
var newfileDirectory = "../js";
if (fs.existsSync(fileDirectory)) {
    var files = fs.readdirSync(fileDirectory);

    for (var i = 0; i < files.length; i++) {

        var filePath = fileDirectory + "/" + files[i];
        var newfilepath = 'newfileDirectory' + "/" + files[i]
        var filestr = JSON.parse(fs.readFileSync(filePath));
        for (var item in filestr) {
            var  inter=filestr[item];
             for(var m in inter)
             {
                inter[m]=parseFloat(inter[m]);

             }
            fs.writeFileSync(newfilepath, JSON.stringify(filestr));
        }

    }
} else {
    console.log(fileDirectory + "  Not Found!");
}
// export