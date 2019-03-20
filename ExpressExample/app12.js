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
//익스프레스 세션 미들웨어 불러오기
var expressSession = require('express-session');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT||3000);
app.use('/public',static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());

//쿠키파서 사용할 수 있도록 등록
app.use(cookieParser());
app.use(expressSession({
  secret : 'my key'
  ,resave:true
  ,saveUninitialized:true

  //저장은 파일로 하거나 레뒤스라하는 메모리데이터베이스에 저장
  //저장할 때 파일을 미리 만들어 두고 정보를 나중에 넣을 것인지
  //정보가 생겼을 때 바로 파일을 만들 것이냐에 대한 정보 설정
}));

var router = express.Router();

router.route('/process/product').get(function(req,res) {
  console.log('/process/product 라우팅 함수 호출됨.');
  //세션 정보는 쿠키와 별반 다르지 않다.
  //설정하고, 확인할 수 있다.
  //정보는 req.session.에 들어가 있음
  if (req.session.user){
    res.redirect('/public/product.html');
  } else {
    res.redirect('/public/login2.html');
  }
  //session 안에 user 객체가 있는지 없는지에 따라서 로그인 여부 판단
})

//로그인에서 세션정보를 남겨줘야 조회하기 전에 if에 걸 수 있다.
router.route('/process/login').post(function(req,res) {
  console.log('/process/login 라우팅 함수 호출됨.');

  //파라미터를 받을거야.
    var paramId = req.body.id ||req.query.id;
    var paramPassword = req.body.password || req.query.id;

    console.log('요청 파라밑터 : ' + paramId+','+paramPassword);

    if(req.session.user) {
      console.log('이미 로그인 되어 있습니다. ')
      req.redirect('/public/product.html');
    }else{
      //만약 세션에 유저가 없다면 속성에 객체를 추가하자
      req.session.user = {
        id:paramId
        ,name:'소녀시대'
        ,authorized:true
      };

      res.writeHead(200,{"Content-Type" :"text/html;charset = 'utf8'"});
      res.write('<h1>로그인 성공 </h1>');
      res.write('<p>Id : '+paramId+'</p>');
      res.write('<br><br><a href = "/process/product">상품페이지로 이동하기</a>');
      res.end();
    }
});

router.route('process/logout').get(function(req,res) {
console.log('/process/logout 라우팅 함수 호출됨.');

if(req.session.user){
  console.log('로그아웃 합니다. ');

//세션정보를 없애준다.
  req.session.destroy(function(err) {
    if(err) {
      console.log('세션 삭제시 에러 발생. ');
      return;
    }
    //정상적으로 삭제되는 경우
    console.log('세션 삭제 성공.');
    res.redirect('/public/login2.html');

  });
}else{
  console.log('로그인 되어 있지 않습니다. ');
  res.redirect('/public/login2.html');

}});


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
