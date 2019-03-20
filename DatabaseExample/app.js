var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//에러핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
//mongodb 모듈 사용
var MongoClient = require('mongodb').MongoClient;
//db에 연결한 다음 필요한 작업을 해주자! (하단)

//db연결
var database;

function connectDB() {
  var databaseUrl = 'mongodb://localhost:27017/local';
//정상적으로 되면 콜백함수를 실행
  MongoClient.connect(databaseUrl, function(err,db){
    //만약 에러가 발생하면
    if(err){
      console.log('데이터 베이스 연결시 에러 발생함.0');
      return;
    }
    console.log('데이터베이스에 연결됨: ' + databaseUrl);
    database=db;
  })
}



var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
  secret : 'my key',
  resave : true,
  saveUninitialized:true
}));

var router = express.Router();

//브라우저를 요청정보를 받아서 처리하는 것을 정의하자.
//route 라는 함수가 ''웹브라우저의 요청을 Post 방식으로 받는다.
router.route('/process/login').post(function(req,res){
  console.log('process/login 라우팅 함수 호출됨');

  var paramId = req.body.id || req.query.id;
  var paramPasswrod = req.body.password || req.query.password;

  console.log('요청 파라미터 : '+ paramId + ', '+paramPassword);
  //여기서는 바깥에 정의된 데이터베이스라는 변수에 객체가 들어가 있으면
  //db가 연결되엉있고 사용하 ㄹ수 있다는걸ㄹ알수있지
  if(database){
    //아래 만들어뒀던 함수 사용한다. authUser()
    //function은 에러나면 첫번째 아니면 두번째(err, )
    authUser(database, paramId, paramPassword, function(err,docs){
      if(err) {
        console.log('에러발생. ');
        res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
        res.write('<h1> 에러발생. </h1>');
        res.end();
        return;
      }
      if(docs) {
        console.dir(docs);
        //docs안에 정보가 들어가있늗네 이게 콘솔에 ~
        res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
        res.write('<h1> 사용자 로그인 성공 </h1>');
        res.write('<div><p>사용자 :'+docs[0].name +'</p></div>');
        res.write('<br><br><a href = "/public/login.html"> 다시 로그인하기 </a>');
        res.end();//엔드를 하면 된다.
      }else{
        console.log('에러발생. ');
        res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
        res.write('<h1> 사용자 데이터 조회 안됨. </h1>');
        res.end();
      }
    });
  } else {
    // connect안된 경우
    console.log('에러발생. ');
    res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
    res.write('<h1> 데이터 베이스 연결 안됨. </h1>');
    res.end();
  }
});
//요청패스 처리를 위한 라우팅이이이잉

app.use('/',router);
//db처리에 오류가 날 수있으므로 함수를 나눠서 처리하는 것이 가장 좋다.

//db를위해 변수선언도 해놨는데 database? db?
//id, password, 를 받으면 callback 을 돌려주자
var authUser = function(db, id, password, callback){
  console.log("authUser 호출됨." + id+','+password);
  //참조할 수 있음 collection 사용
  var users = db.collection('users');

  //찾고자 하는 정보를 넣어준다.
  //toArray() --> 배열로 바꿔준다. --> 처리를 위해 콜백함수
  users.find({"id":id, "password":password}).toArray(function(err, docs){
    //만약 에러가 나는치 에러체크부터 확인하자아아
    if(err) {
      //콜백으로 에러처리하면 함수 호출한 곳에서!
      callback(err, null);//두번째는 정상일 경우에 값을 넘기는 인다.
      return;
    }
    //만약 문서 가 여러개인 경우에
    if(docs.length > 0){
      console.log('일치하는 사용자를 찾음.');
      callback(null, docs);
    }else{
      console.log('일치하는 사용자를 찾지 못함.');
      callback(null, null);
    }
  });

}



var errorHandler = expressErrorHandler({
  static:{
    '404' : './public/404.html'
    //퍼블릭이라는 폴더 밑에 html 파일 만들어 줘야한당!
  }
});

app.use( expressErrorHandler.httpError(404));
app.use( errorHandler );

var server = http.createServer(app).listen(app.get('port'),function()
{
  console.log('익스프레스로 웹 서버를 실행함 : '+app.get('port'));

  connectDB();
});

//웹서버 실행 전에 db연결부터 해도 상관은 없음
//웹서버 실행 항태를 확인하고 db 연결하고싶을때.
