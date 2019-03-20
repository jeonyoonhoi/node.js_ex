//대부분은 비동기식으로 하지만 동기식으로 처리할떄도 있음
var fs =  require('fs');

fs.writeFile('./output.txt','Hello.',function(err) {
  //err 객체가 나오면 이것 부터 확인한다.
  if (err) {
    console.log('에러발생,');
    console.dir(err);
    return;
  }

  console.log('output.txt 파일에 데이터 쓰기 완료함. ');
})
