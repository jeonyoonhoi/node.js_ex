function add(a,b){
  return a+b;
}

var result = add(10,10);
console.log('더하기 결과 : '+result);


var add2 = function add(a,b){
  return a+b;
}
//함수가 변수에 할당될 수 있다.
var result = add2(10,10);
console.log('더하기 결과 : '+result);
