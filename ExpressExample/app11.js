//30 쿠키와 세션
//Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

//익스프레스 미들웨어 불러오기
var bodyParser = require('body-parser')
,static = require('serve-static');
//쿠키파서 미들웨어 불러오기
var cookieParser = require('cookie-parser');


//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT||3000);
app.use('/public',static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());

//쿠키파서 사용할 수 있도록
app.use(cookieParser())

var router = express.Router();

router.route('/process/login').post(function(req,res){
  console.log('/process/login 라우팅 함수에서 받음.');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead('200',{'Content-Type':'text/html;charset = utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
  res.write('<div><p>Param id : '+paramId + '</p></div>');
  res.write('<div><p>Param password : '+ paramPassword+'</p></div>');
  res.end();
});

router.route('/process/setUserCookie').get(function(req,res) {
  console.log('/process/setUserCookie 호출됨.');

  //쿠키설정 ' user' 라는 이름으로 {객체}를 만들어준다.
  res.cookie('user',{
    id : 'mike'
    ,name : '소녀시대'
    ,authorized :true
  });

  //redirecte로 응답
  res.redirect('/process/showCookie');
});

//응답객체 안에 쿠키를 넣어줘
router.route('/process/showCookie').get(function(req,res) {
  console.log('/proess/showCookie 라우팅 함수 호출됨');
  //클라이언트 쪽으로 데이터를 보낸다.
  res.send(req.cookies);
});

app.use('/',router);
// '/'이거 뒤로 놔줘야행
app.all('*',function(req,res) {
  res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다. </h1>');
});

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('익스프레스로 웹 서버를 실행 : '+app.get('port'));
});
