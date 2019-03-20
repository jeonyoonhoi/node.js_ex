var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser')
,static = require('serve-static');

var app = express();

app.set('port',process.env.PORT||3000);


app.use('/public',static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/:op/:num1/:num2').get(function(req,res) {
  console.log("'/:op/:num1/:num2'처리함 . ");

  var paramOp = req.params.op;
  var paramNum1 = req.params.num1;
  var paramNum2 = req.params.num2;
  var result = 0;

  if(paramOp=='add'||paramOp=='+'){
    result = parseInt(paramNum1)+parseInt(paramNum2);
  }else if (paramOp=='substract'||paramOp=='-') {
    result = paramNum1-paramNum2;
  }else if(paramOp =='divide'||paramOp=='/'){
    result = paramNum1/paramNum2;
  }else if(paramOp =='multiply'||paramOp=='*'){
    result = paramNum1*paramNum2;
  }

  console.log('처리결과 : '+paramNum1+' '+paramOp+' '+paramNum2+' = '+result);

  res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>')
  res.write('<div><p>Param id : '+paramNum1 +' '+paramOp+' '+paramNum2+' = '+result+'</p></div>');
  res.end();

});

app.use('/',router);

var server = http.createServer(app).listen(app.get('port'),function() {
  console.log('익스프레스 웹 서버 실행 : '+ app.get('port'));
})
