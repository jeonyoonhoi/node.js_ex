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
//미들웨어에서 파라미터 확인
//각 요청 패스마다 다른 방식으로 함수가 처리하도록 해준다.
//이 요청패스로 들어온건 .post (처리함수가 처리해야한다. )
//미들웨어처럼 다 받는게 아니라 이 패스만
router.route('/process/login').post(function(req,res){
  //req 받아서 res 보낸다.
  console.log('/process/login 라우팅 함수에서 받음.');
  //서버에서 로그로 확인할 수 있도록!

  //post 방식||get방식
  var paramId = req.body.id ||req.query.id;
  var paramPassword = req.body.password || req.query.password;

  //응답 코드를 넣어보장
  res.writeHead('200', {'Content-Type':'text/html;charset = utf8'});
  //헤더정보쓰기 ('200' ;  객체 )
  res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
  res.write('<div><p>Param id : ' + paramId+ '</p></div>');
  res.write('<div><p>Param password : ' +paramPassword + '</p></div>');
  res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기 </a>");
  res.end();
});



//미들웨어로 등록한다.
app.use('/',router);

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행 : '+app.get('port'));
});


//모듈을 사용하면 미리 만들어진 페이지를 보낼 수 있다.
var expressErrorHandler = require('express-error-handler');

var errorHandler = expressErrorHandler({
  static: {
    '404':'./public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//all() : 모든 경우에 대해 처리하는 함수!
//오류 페이지 보여 주기-- 지정된 페이지가 없으면!
app.all('*', function(req,res) {
  res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다. </h1>');
});
