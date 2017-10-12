//created by liujianwen 01/12/2017
var http = require("http"); 
var data = {key: 'value', hello: 'world'};
 
http.createServer(function(request, response) { 
	console.log('server is run ')
	console.log(request+'thisi is requet');
	console.log(response+'this is response')
 
//  response.writeHead(200, {"Content-Type": "text/plain"}); 
	var post="";
	request.on('data',function(chunk){
		post+=chunk;
	})
 
//  response.write("Hello World"); 
 
    response.end(JSON.stringify(data)); 
 
}).listen(8888);