var express =  require('express');
var app = express();

//express() 를 통해 인스턴스를 생성
//get users 를 통해 디렉토리 패스를 처리를 해라 .

var users = [
  {id:1, name:'alice'},
  {id:2, name:'bak'},
  {id:3, name :'chris'}
];

app.get('/users',function(req,res){
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit,10);
  if(Number.isNaN(limit)){
    return res.status(400).end();
    //만약에 NAN 이면 400이란 코드를 내보내고 종료해라.
  }
  res.json(users.slice(0,limit));
});

//서버를 열어서 구동할 수 있게 짠다.
app.listen(300,function(){
  console.log('Example app listening on port 3000!');
});

module.exports = app;
