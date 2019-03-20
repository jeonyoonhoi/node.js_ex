
//모듈 불러들이기
var mongodb = require("mongodb");
var mongoose = require("mongoose");

//디비 연결
var database;
var UserSchema;
var UserModel

function connectDB(){
  var databaseUrl = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('open',function() {
      console.log('데이터베이스에 여결되었습니다. : '+databaseUrl)
      createUserSchema();
      doTest();
    });

    database.on('disconnected',function() {
      console.log('데이터베이스 연결 끊어짐');
    });

function createUserSchema() {
  UserSchema = mongoose.Schema({
    id : {type : String, required : true, unique :true}
    ,name : {type : String, index : 'hased','default':''}
    ,age : {type : Number, 'default': -1}
    ,created_at: {type : Date, index : {unique : false},'default' : Date.now}
    ,updated_at : {type : Date, index : {unique : false},'default' : Date.now}
  });
  console.log('UserSchema 정의함. ');

  //.get.set 함수 설정
  UserSchema.virtual('info').set(function(info) {
    var splitted = into.split(' ');
    this.id = splitted[0];
    this.name = splitted[1];
    console.log('virtual info 속성 설정함 :  %s %s',this.id, this.name);
  }).get(function() {return this.id + ' ' + this.name});

  console.log('UserSchema  정의함. ');
  UserModel = monoose.model("users4",UserSchema);
  console.log('UserModel정의함. ');
}

function doTest() {
  var user = new UserModel({"info":"test 01"});

  user.save(function(err) {
    if(err){throw err;}

    console.log("사용자 데이터 추가함.");

    findAll();
  });

  console.log('info 속성에 값 할당함.');
  console.log('id : %s, name : %s', user.id, user.name);
}

function findAll() {
  UserModel.find({}, function(err, results) {
  if(err){throw err;}
  if(results) {
    console.log('조회된 user 문서 객체 #0 ->id : %s, name, :%s', results[0]._doc.id, results[0]._doc.name);
  }
});
}
connectDB();
}
