var output = '안녕!';
var buffer1 = new Buffer(10);

var len = buffer1.write(output,'utf8');
console.log('버퍼에 쓰인 문자열의 길이 : ' +len);
console.log('첫번째 버퍼에 쓰인 문자열 : '+ buffer1.toString());

console.log('버퍼 객체인지 여부 : '+Buffer.isBuffer(buffer1));
var byteLen = Buffer.byteLength(buffer1);//길이값 리턴
console.log('byteLen : ' + byteLen);

var str1 = buffer1.toString('utf8',0,6);
console.log('str1 : '+str1);

//버퍼 안에 바이트로 된 문자열이 들어가게 한다.
//문자열을 버퍼로 변환
var buffer2 =  Buffer.from('Hello','utf8');
console.log('두 번째 버퍼의 길이 : '+Bufffer.ByteLength(buffer2));

buffer2.toString('utf8',0,Buffer.byteLength(buffer2));
console.log('str2 : '+str2);
