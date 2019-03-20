//파일 직접 열고 닫으면서 읽거나 쓰기
var fs = require('fs');
//qlehdrl qkdtlrdms 콜백함수 function
// w : write
fs.open('./output.txt','w',function(err,fd){
  if(err) {//만약 에러가 발생하면
    console.log('파일 오픈 시 에러 발생');
    console.dir(err);//dir로 err 를 뿌린다
    return;
  }
  //open(function)-> wirte(function)-> close
  //비동기 방식에서
  var buf = new Buffer('안녕!\n');
  fs.write(fd,buf,0, buf.length,null, function(err,written,
  buffer) {
      if(err){
        console.log('파일쓰기시 에러 발생');
        console.dir(err);

        return;
      }
      console.log('파일 쓰기 완료함.');

      fs.close(fd,function(){
        console.log('파일 닫기 완료함. ');
      })
  });
});
