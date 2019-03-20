console.log("안녕하세여!!");

console.log('숫자입니다. %d',30);

console.log('문자열 입니다. %s','안녕 ㅎㅎ')


//중괄호를 이용해서 자바 스크립트 객체 만든다.
//중괄호 안에 속성을 넣을 수 있다.

var person = {
  name : '소녀시대',
  age : 20
};
console.log('Java script 객체입니다. %j', person );

console.log('Java script 객체입니다. %j', person.name );
//console 객체는 전역이라 어디서든 사용 가능하다.

//자바스크립트 객체를 그대로
console.dir(person);

console.time('duration_time');
var result =0 ;
for(var i =0; i<10000;i++){
  result +=i;
}
console.timeEnd('duration_time');

console.log('파일 이름 : %s',filename);;
console.log('패스 : %s',__dirname);
