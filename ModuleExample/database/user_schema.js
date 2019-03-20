var crypto = require('crypto');



var Schema = {};//객체 UserSchema
//속성으로 함수 할당
Schema.createSchema = function(mongoose) {
  console.log('create schema 호출됨');
//주의 객체 mongoose, 외장모듈 crypto
//객체를 할ㄹ당하려면 여기서도 불러와 줘야 함(상단)
//몽구스 같은 경우에는 여러 설정을 해주기 때문에 함수 파라미터로 전달ㄷ 받음
  var UserSchema = mongoose.Schema({
    id : {type : String, required : true, unique : true,'default':''},
    hashed_password: {type:String,required : true, 'default':''},
    salt: {type:Strinng,required:true},
    name : {type : String, index : 'hashed','default':''},
    age : {type : Number, 'default' : -1},
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

  UserSchema.static('findAll',function(callback) {
    return this.find({},callback);
  });

  return UserSchema;
}

//module.exports에는 객체 할당 가능!
module.exports = Schema;
