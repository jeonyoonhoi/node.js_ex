var http = require('http');
//http 프로토콜 가져온다.

var server = http.createServer();
//웹 서버 객체를 만듦.

var host = '115.145.82.48';
var port = 3000;

//웹서버가 포트번호 3000 에서 listen,대기 하고 있도록 함.
server.listen(port, host, 50000, function(){
  console.log('웹서버 실행됨.');
});

//클라이언트 연결 이벤트 처리
//서버객체가 이벤트 이미터를 상속하기 때문에 on을 쓸 수 있음
server.on('connection',function(socket){
  var addr =  socket.address();
  console.log('클라이언트가 접속했습니다.  : %s, %d',addr.address,addr.port);
});

//클라이언트 요청 이벤트 처리
server.on('request',function(req,res) {
  console.log('클라이언트 요청이 들어왔습니다');
  //console.dir(req);
  //dir :: 속성 출력하는 메소드

  res.writeHead(200, {"Content-Type":"text/html;charset = utf-8"});
  res.write('<h1> 웹서버로부터 받은 응답</h1>');
  res.end();

});

//클라이언트 종료 이벤트 처리
server.on('close',function(req,res){
  console.log('서버가 종료됩니다. ');
});
