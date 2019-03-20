
/*express를 사용하여 외장 내장 모듈 불러오기*/
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//에러핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

//암호화 모듈
var crypto = require('crypto');


//mongoose 모듈 사용
var mongoose = require('mongoose');

//db연결 --> 그대로
var database;
var UserSchema;
var UserModel;
//42 6-8
function connectDB() {
  var databaseUrl = 'mongodb://localhost:27017/local';

  mongoose.Promise = global.Promise;
  //몽구스가 프로미스를 사용한다. 이 모듈이 원하는 설정
  mongoose.connect(databaseUrl);

  //연결이 되었다고 생각하면
  database = mongoose.connection;
  //커넥션이 된 시점의 m.c 가 db에 연결되도록 할 수도 있다 (참고)

  //방법은 이벤트로 제공
  database.on('open',function() {
    console.log('데이터 베이스에 연결 됨 : '+ databaseUrl);
//    database = mongoose.connection;

    //스키마는 정의를 한다.6-8
    UserSchema = mongoose.Schema({
      //여러개 정보를 넣고 싶으면 중괄호, 객체로
      id : {type : String, required : true, unique : true},
      name : {type : String, index : 'hashed'},
      password :{type : String, required:true},
      age : {type : Number, 'default' : 687},
      created_at : {type : Date, index : {unique:false}, 'default':Date.now},
      updated_at : {type : Date, index : {unique:false}, 'default':Date.now}
    });
    console.log('UserSchema 정의함.');

    UserSchema.virtual('password')
              .set(function(password) {
                this.salt = this.makeSalt();
                this.hashed_password = this.encryptPassword(password);
                console.log('virtual password 저장됨 :  '+
                this.hashed_password);
              });

    UserSchema.method('encryptPassword', function(plainText, inSalt) {
      if(inSalt){
        return crypto.createHmac('sha1',
      inSalt).update(plainText).digest('hex');
    }else{
      return crypto.createHmac('sha1',
      this.salt).update(plainText).digest('hex');
    }
    });

    UserSchema.method('makeSalt',function() {
      return Math.round((new Date().valueOf() * Math.random()))+'';

    });

    UserSchema.method('authenticate',function(plainText,inSalt,hashed_password) {
      if (inSalt) {
        console.log('authenticate 호출됨.');
        return this.encryptPassword(plainText, inSalt)===hashed_password;
      }else {
        console.log('authenticate 호출됨.');
        return this.encryptPassword(plainText) ===hashed_password;
      }
    });


    UserSchema.static('findById', function(id,callback) {
      return this.find({id:id}, callback);
    });

/*
//이렇게 만들 수도 있음!
//this.는 find() 함수를 사용  (모델객체에서 참조, 사용)
//javascript의 this는 함수를호출한객체를 this로 참조
//
    UserSchema.statics.findById = function(id, callback) {
      return this.find({id:id}, callback);

    }
*/
//2가지 method()사용법(모델 인스턴스, )메소드라는 함수, 객체에 등록



    UserSchema.static('findAll',function(callback) {
      return this.find({},callback);
    });
    //스키마에 정의를 했는데 모델에서 사용할 수 있다.
    //this는 함수가 호출한객체를 가리킨다. 여긴 모델객체

    //(스키마와 모델 )연결 users 내 컬렉션임
    UserModel = mongoose.model('users2' ,UserSchema);
    console.log('UserModel 정의함.');

  });
  //이벤트가 발생했을때 처리할 함수

  database.on('disconnected',function() {
    console.log('데이터베이스 연결 끊어짐');

  });

  database.on('error',console.error.bind(console, 'mongoose 연결에러.'));
}//

var addUser = function(database, id, password, name, callback){
  console.log('addUser 호출됨.');

  var users = database.collection('users');

  users.insertMany()
  //////////////////////////////////////////////////////////
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

//44
router.route('/process/listuser').post(function(req,res) {
  console.log('/process/listUser 라우팅 함수 호출됨.');

  if(database) {
    UserModel.findAll(function(err,results) {
      //static으로 미리 정의한 함수는 별도로 메소드를 정하지 않아도 될 정도로 하나의 간단한 함수 정의한 것과 같다.
      if(err) {
        console.log('에러발생. ');
        res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
        res.write('<h1> 에러발생. </h1>');
        res.end();
        return;
      }
      if(results) {
         console.dir(results);
         //200 정상응답 헤더의 값 :  주고

         res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
         res.write("<h3>사용자 리스트 </h3>");
         res.write("<div><ul>");

         for(var i =0;i<results.length;i++) {
           var curId = results[i]._doc.id;
           var curName = results[i]._doc.name;
           res.write("    <li>#"+i+" : "+curId+" , "+curName +"</li>");
         }
         res.write("</ul></div>");
         res.end();
      }else{
        console.log('에러발생. ');
        res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
        res.write('<h1> 조회된 사용자 없음 </h1>');
        res.end();
      }
    });
  }else {
    // connect안된 경우
    console.log('에러발생. ');
    res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
    res.write('<h1> 데이터 베이스 연결 안됨. </h1>');
    res.end();
  }});



//브라우저를 요청정보를 받아서 처리하는 것을 정의하자.
//route 라는 함수가 ''웹브라우저의 요청을 Post 방식으로 받는다.
router.route('/process/login').post(function(req,res){
  console.log('process/login 라우팅 함수 호출됨');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

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

router.route('/process/adduser').post(function(req,res) {
  console.log('/process/adduser 라우팅 함수 호출됨.');

  var paramId = req.body.id ||req.query.id;
  var paramPassword = req.body.password||req.query.password;
  var paramName = req.body.name||req.query.name;

  console.log('요청 파라미터 : '+paramId + ','+paramPassword + ',' + paramName);

  if(database) {
    addUser(database, paramId,paramPassword,paramName,
      function(err,result) {
        if(err) {
          console.log('에러발생. ');
          res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
          res.write('<h1> 사용자 추가 안됨. </h1>');
          res.end();
        }else{
          res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
          res.write('<h1> 사용자 추가 성공 </h1>');
          res.write('<div><p>사용자 :'+paramName +'</p></div>');
          res.end();//엔드를 하면 된다.

        }
      })
  } else {
    //db조회 안됨
    console.log('에러발생. ');
    res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
    res.write('<h1> 데이터 베이스 연결 안됨. </h1>');
    res.end();
  }
})

app.use('/',router);
//db처리에 오류가 날 수있으므로 함수를 나눠서 처리하는 것이 가장 좋다.

//db를위해 변수선언도 해놨는데 database? db?
//id, password, 를 받으면 callback 을 돌려주자
var authUser = function(db, id, password,callback){
  console.log("authUser 호출됨." + id+','+password+',');
  //44강 위에서 정의하 ㄴfindBYId
  UserModel.findById(id,function(err,results) {
    if(err) {
      callback(err,null);
      return;
    }
    console.log('아이디 %s로 검색했습니다. ');
    if (results.length >0){
      //_doc에 정보가 저장되어 있다
      if(results[0]._doc.password ==password) {
        console.log('비밀번호 일치함.');
        callback(null, results);
      }else {
        console.log('비밀번호 일치하지 않음');
        callback(null,null);
      }
    }else {
      console.log('아이디 일치하는 사용자 없음.');
      callback(null, null);
    }});
  //06-08
  // 아래 find와 다른것은 collection이아닌 UserModel을 참조한다.
  //UserModel 객체의 find 함수로 접근
  //results == docs
  UserModel.find({"id":id,"password":password},function(err,docs){
    if (err) {
      //만약
      callback(err,null);
      return;
    }
    //정상적인 상황
    if(docs.length > 0){
      console.log('일치하는 사용자를 찾음.');
      callback(null, docs);
    }else{
      console.log('일치하는 사용자를 찾지 못함.');
      callback(null, null);
    }
  });
/*
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
*/
};

//39강
var addUser  = function(db, id, password, name, callback) {
  console.log("addUser 호출됨 : " + id + ", " + password + ',' + name);

  //한 명의 유저정보를 가진 객체를 만들었다.
  var user = new UserModel({"id":id, "password":password,"name" : name});
  //user 객체 안에 save() 함수로 정보를 저장하고 결과를 callback함수로 받음
  user.save(function(err) {
    if(err) {
      callback(err,null);
      return;
    }
    console.log('사용자 데이터 추가함.');
    callback(null,user);
  })

  var users = db.collection('users');
  //insertMany에는 여러개를 한번에 인서트 하는 기능 - 배열로 객체
  users.insertMany([{"id":id,"password":password,"name":name}],
    function(err,result) {
      if(err) {
        //에러를 콜백해줘야 여기서는 데이터베이스업무에만 집중
        console.log('여기서 에러남');
        callback(err,null);
        return;
      }

      if(result.insertedCount>0) {
        console.log('사용자 추가됨, : '+result.insertedCount);
        callback(null,result);
      }else{
        console.log('추가된 레코드가 없음.');
        callback(null,null);

      }
    });

}; //adduser 끝



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
