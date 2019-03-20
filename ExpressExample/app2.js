//두 개의 모듈을 사용합니다.
var express = require('express');
var http = require('http');


//express를 함수로 실행해서 app로 받아온다.
var app = express();
//express 서버 객체
//웹서버가 실행될때 포트를 어디로 할 것인가
//PORT라는 값을 사용하거나 없다면 3000을 사용해라--
app.set('port', process.env.PORT ||3000);
//포트 정보 설정이 차이가 있음

//use() 메소드로 등록한 함수들은 등록 순서에 따라 클라이언트 요청을 처리합니다.
app.use(function(req,res,next){
  console.log('첫번째 미들웨어 호출됨.');

  res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});//200정상응답, 헤더
  res.end('<h1>서버에서 응답한 결과입니다.</h1>');

});


var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행함 : '+app.get('port'));

});
