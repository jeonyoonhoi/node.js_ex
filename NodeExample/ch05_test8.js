var http = require('http');

//외부 서버의 정보 ip, port
var opts={
  host : 'www.google.com',
  port : 80,
  method : 'POST',
  path:'/',
  headers : {}
};

//get 메소드를 사용하면 다른 사이트에 요청을 보내고 응답을 받아 처리할 수 있음
//get(다른 사이트의 정보를 갖는 객체, 콜백함수)
var resData='';
var req = http.request(opts,function(res){
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

opts.headers['Content-Type']='application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Type']=req.data.length;

req.on('error', function(err){
  console.log("오류발생 : "+err.message);
});

req.write(req,data);
teq.end();
