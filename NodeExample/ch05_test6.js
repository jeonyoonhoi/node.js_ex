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

//파이프로 연결하여 알아서 처리하도록 설정
  infile.pipe(res);

  });
});
