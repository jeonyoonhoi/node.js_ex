'use strict';

const http = requrie('http');

exports.handler = (event, context, callback) => {
var options = {
"host" : process.env.ip,
"path" : "/api/"+process.env.id + "/groups/0/action",
"method" : "PUT",
"header":{
"Content-Type" : "application/json",
}
}

console.log(options)

callback = function(response){
var str = "";
response.on('data',function(chunk){
str+=chunk;
})
response.on("end",function(){
console.log(str);
})
}

var body = JSON.stringify({
"on" : false});

http.request(options,callback).end(body);
}