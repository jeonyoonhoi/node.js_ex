//Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

//Express 의 미들웨어 불러오기
var bodyParser = require('body-parser')
,static =require('serve-static');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));
//body-parser를 이용해서 application / x-www-form-urlencode 파싱
app.use(bodyParser.urlencoded({ extended : false}));
//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

//ROUTER
var router = express.Router();

router.route('/process/login/:name').post(function(req,res){
  console.log('/process/login/:name 라우팅 함수에서 받음.');
  //name 이 파라미터처럼 들어오게 된다.
  var paramName = req.params.name;

  var paramId = req.body.id ||req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead('200', {'Content-Type':'text/html;charset = utf8'});
  //헤더정보쓰기
  res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
  res.write('<div><p>Param name : ' + paramName + '</p></div>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' +paramPassword + '</p></div>');
  res.write("<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기 </a>");
  res.end();
});

//미들웨어로 등록한다.
app.use('/',router);

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행 : '+app.get('port'));
});

app.all('*',function(req,res){
  res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다. </h1>');
});
