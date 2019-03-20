var user1 = require('./user1');
//exports라는 객체가 들어가 있다 속성으로들어가는
function showUser(){
  return user1.getUser().name+', '+ user1.group.name;
  //user1을 리턴해서 그 dksdml getUser라는 함수 의 name호출 하면 그 객체의 값이 나옴
  //
}
console.log('사용자정보 -> '+showUser());
//exportx에 속성이 아니라 객체를 바로 할당하면 문제가 생긴다.
//exports 전역객체로서 모듈파일 안에 들어간 형태 메인파일에서 참조하는 형태가 아님
//꼭 속성으로 추가 해줘야 한다. exports는!
//module. exports는 바로 추가해 줄 수 있다
