var express = require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT || 3000);

app.use(function(req, res, next){
  console.log('첫 번째 미들웨어 호출됨.');

  req.user = 'mike';

  next();
  //다음 미들웨어로 넘어간다.
  });

app.use(function(req,res,next) {
  console.log('두 번째 미들웨어 호출됨. ');
  //res.writeHead(200, {"Content-Type":"text/html'charset = utf8"});
  //res.end('<h1>서버에서 응답한 결과입니다 : '+req.user+'</h1>');]

  //res.send('<h1>서버에서 응답한 결과입니다 : '+req.user+'</h1>');

  var person = {name:'소녀시대',age:20};
  //res.send(person);


//json문자열로 바꿔서 보낸다.
var personStr =JSON.stringify(person);
//  res.send(personStr);
  res.writeHead(200,{"Content-Type":"application/json;charset='utf-8'"});
  res.write(personStr);
  res.end();
});
var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서비스를 실행함 : '+ app.get('port'));
});
