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

var multer = require('multer');
var fs = require('fs');//파일 관련

//서버에서 웹페이지 줄때 ajax로 욫엉을 보낼 수 있다.
//서버쪽에 특정한 정보 요청하면 데이터가 json형식으로 오게 된다.
//근데 우리가 웹 페이지를 연 서버가 있으면 그 서버로만 접속하게 된다.
//하나의 서버만 접속하는 문제는 보안 때문이었는데
//요즘은 다른 서버로 접속을 클라이언트에서 직접 하고 싶은 경우!
//즉, 다른 서버로 접속하고 싶을 때 CORS : 서버쪽에서 옵션을 더 주면

var cors = require('cors');


//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT||3000);
app.use('/public',static(path.join(__dirname,'public')));
app.use('/uploads',static(path.join(__dirname,'uploads')));
//현재 폴더 밑에 uploads라는 폴더를 열어 줄 것이다.
//업로드 되는 파일을 여기로 올려주자.
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

app.use(cors());

//multer의 함수를 만들어준다.
var storage = multer.diskStorage({
  destination : function(req,file, callback){
    callback(null, 'uploads');//어디 폴더로
  },
  filename : function(req,file,callback){
    //callback(null,file.originalname + Date.now());
    //업로드 된 파일은 고유한 정보로 별도으 ㅣ이름으로 만들어준다. -- + 시간
      //EXTNAME : 홪장자만 꺼낸다.
    var extension = path.extname(file.originalname);
    var basename = path.basename(file.originalname, extension);
    callback(null, basename + Date.now()+extension);
    //이름은 어떻게 할건지
  }
});

var upload = multer({
  storage : storage,
  limits :{
    //몇개
    files : 10
    ,fileSize:1024*1024*1024
  }
});

var router = express.Router();

//라우팅 함수를 추가한다. 웹페이지에서의 요청패스를 받아서 post방식으로 응답
//post라고 하는 함수를이용해서 다른 정보를 더 넣을 수 있다.ㅏ
//미리 설정해둔 upload라는 객체를 이용, array 라는 함수를 실행, 그 결과를 첫 번째 파라미터로
//photo 결과를 첫번째로 넘긴다. photo라는 것으로 넘어온게 있으면 1개 저장 한다.
router.route('/process/photo').post(upload.array('photo',1),
function (req,res) {
  console.log('/process/photo 라우팅 함수 호출됨.');
//try{
  var files = req.files;
  console.log('==== 업로드된 파일 ====');
  if(files.length >0){
    console.dir(files[0]);
  }else{
    console.log('파일이 없습니다 .');
  }

  var originalname;
  var filename;
  var mimetype;
  var size;

  if(Array.isArray(files)){
    for(var i =0; i<files.length; i++){
      //필요한 정보를 확인하자.
        originalname = files[i].originalname;
        filename = files[i].filename;
        mimetype = files[i].mimetype;
        size = files[i].size;
    }
  }

  console.log('현재 파일 정보 : '+originalname+', '+filename+', '+mimetype + ', '+size);

  res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
  res.write("<h1> 파일 업로드 성공 </h1>");
  res.write("<p>원본파일 : "+originalname  +"</p>");
  res.write("<p>저장파일 : "+filename  +"</p>");
  res.end()//버내라~~
//}
});

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

}
})


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
