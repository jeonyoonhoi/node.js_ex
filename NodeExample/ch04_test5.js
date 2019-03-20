var fs = require('fs');

var data = fs.readFileSync('./package.json','utf8');
console.log(data);
//파일의 내용을 읽어서 출력하는 프로그램
