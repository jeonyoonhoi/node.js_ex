//OS 모듈 사용

var path = require('path');

var directories = ['users', 'Mars', 'docs'];
var dirStr = directories.join();
//join 3개의 문자열이 붙어서 출력된다.
console.log('dir = '+dirStr);

var dirStr2  = directories.join(path.sep);
console.log('dir2 : '+dirStr2);

var filepath = path.join('/Users/YOONHOI/','notepad.exe');
console.log('filepath : ' + filepath);

var dirname = path.dirname(filepath);
console.log('dirname : '+dirname);

var basename = path.basename(filepath);
console.log('basename : '+basename);

var extname = path.extname(filepath);
console.log('extname : '+extname);
