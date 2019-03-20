var http=require('http');
var fs = require('fs');

var server =http.createServer();

var host = '115.145.82.48';
var port = 3000;
server.listen(port,host,50000,function(){
  console.log('웹서버 실행됨.');
});

server.on('connection', function(socket){
  console.log('클라이언트가 접속했습니다.');
});
server.on('request', function(req,res){
  console.log('클라이언트 요청이 들어왔습니다.');
  var filename = 'house.png';
  var infile = fs.createReadStream(filename, {flags : 'r'});
  var filelength =0;
  var curlength = 0;

//파일을 읽기 전에 먼저 파일을 열고, 그 다음에 스트림에서 일정 크기만큼만 읽어 응답을 보냄


  fs.stat(filename, function(err,stats){
    filelength = stats.size;
  });

  infile.on('readable',function(){
    var chunk;
    while(null!=(cunk = infile.read())){
      console.log('읽어 들인 데이터 크기 : %d 바이트',chunk.length);
      curlength+=chunk.length;

      //write에 콜백함수를 전달하여 쓰기가 완료된 시점을 확인한다.
      //콜백 함수 안에서는 파일크기만큼 응답 객체에 쓰기ㅣ를 모두 완료했는지! 확인
      //응답 객체에 쓰는 작업이 끝났으면 end()로 응답 데이터를 전송합니다.
      res.write(chunk,'utf8',function(err){
        console.log('파일 부분 쓰기 완료 :  %d, 파일크기 :  %d', curlength,filelength);
        if(curlength>=filelength){
          res.end(0);
          //write 가 종료되는 시점에서 end호출
        }
      });
    }
  });
});
