var express = require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT||3000);

app.use(function(req,res,next){
  console.log('첫 번쨰 미들웨어 호출됨.');
  var userAgent = req.header('User-Agent');
  //특정한 정보를 확인 그중 헤더에서 User--Agent를  찾음
  var paramName = req.query.name;
  //name이라는 요청객체가 있으면 !!
  res.send('<h3>서버에서 응답 : User-Agent -> '+userAgent+
  '<h3>Param name -> '+paramName +'</h3>');
  //
});
