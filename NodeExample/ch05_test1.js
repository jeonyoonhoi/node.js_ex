var http = require('http');
//require메소드로 http모듈을 불러온다.
//http 변수를 만든 뒤 이 변수에 할당ㄹ한다

//웹서버객체 리턴
//서버는 데기하고 있다가 클라이언트의 요구에따라~
//즉, 이 서버 객체의 listen() 메소드를 호출하면 웹 서버가 시작된다.
var server = http.createServer();
//웹 서버 객체를 만든다.

var host = '';
//웹서버를 시작하여 3000번 포트에서 대기한다.
var port = '3000';
server.listen(port,host, 50000, function() {
  console.log('웹서버가 실행되었습니다 : '+port);
});
