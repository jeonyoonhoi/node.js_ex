var http = require('http');

//외부 서버의 정보 ip, port
var options={
  host : 'www.google.com',
  port : 80,
  path:'/'
};

//get 메소드를 사용하면 다른 사이트에 요청을 보내고 응답을 받아 처리할 수 있음
//get(다른 사이트의 정보를 갖는 객체, 콜백함수)
var req = http.get(options,function(res){
  var resData='';
  //data와 end 로 이벤트를 받아준다.
  //data 이벤트일 경우 chunk를 다 resData 에 저장함
  res.on('data',function(chunk){
    resData+=chunk;
  });

  //end이벤트일경우 resData 를 출력한다. 
  res.on('end', function(){
    console.log(resData);
  });
});

req.on('error', function(err){
  console.log("오류발생 : "+err.message);
});
