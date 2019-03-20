var user = require('./user4.js');
//user라는 변수에는 함수가 할당되게 한다
//이 함수는 user()하면 실행됨
function showUser(){
  return user().name + ', '+'No Group';
}

console.log('사용자 정보 : '+showUser());
