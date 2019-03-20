var http=require('http');
var fs = require('fs');
// 파일 읽고 쓰기 모듈

var server =http.createServer();

var host = '115.145.82.48';
var port = 3000;
server.listen(port,host,50000,function(){
  console.log('웹서버 실행됨.');
});

server.on('connection', function(socket){
  console.log('클라이언트가 접속했습니다.');
});
//on 메서드를 호출하여 request 이벤트 처리
//readFile()메소ㅗ드로 img.png 파일을 읽어들인다. --> 비동기 방식으로 처ㅓ리
server.on('request', function(req,res){
  console.log('클라이언트 요청이 들어왔습니다.');
  var filename = 'img.png';
  fs.readFile(filname, function(err,data){
      res.writeHead(200,{"Content-Type":"image/png"});
      res.write(data);
      res.end();

  });
});
