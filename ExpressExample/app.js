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

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행함 : '+app.get('port'));

});
