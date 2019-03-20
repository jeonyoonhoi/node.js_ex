var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser=require('body-parser');

var app =express()

app.set('port',process.env.PORT||3000);
app.use('/public',static(path.join(__dirname,'public')));
//폴더의 패스, public폴더 붙여서
//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//포스트 방식일 경우에는 바디 안에 요청 파라미터가 들어있다.
//use는 공통인 기능인 경우에는 외장 모듈(다른 사람이 만드렁놓은 것)
app.use((req,res,next) => {// 실제웹서버에서는 이보다 다야아ㅏ
  console.log('첫 번쨰 미들웨어 호출됨.');
  var userAgent = req.header('User-Agent');
  //특정한 정보를 확인 그중 헤더에서 User--Agent를  찾음
  //var paramName = req.query.name;
  var paramId = req.body.id||req.query.id;
  //name이라는 요청객체가 있으면 !!
  res.send('<h3>서버에서 응답 : User-Agent -> '+userAgent+'</h3>'+
  '<h3> Param id -> '+paramId +'</h3>');
  //
});

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행 : '+app.get('port'));
});
