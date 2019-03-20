var user = require('./user3');
//module.exports = user객체 가 그대로 할당된다.

function showUser(){
  return user.getUser()name + ','+user.group.name;
}

//module.exports는 객체도 함수도 할당 가능 flexible!!!!
