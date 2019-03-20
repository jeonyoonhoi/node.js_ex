var fs = require('fs');

//비동기 방식
fs.readFile('./package.json','utf8',function(err,data){
  //콜백함수로 보낸당.
  console.log(data);
})

//test 5,6 의 결과는 동일하지만 실행되는 방식이다르다.
//5는 다읽을때 까지 기다림
//6은 일단 넘어가고 파일을 다 읽고나면 function함수가 실행됨
