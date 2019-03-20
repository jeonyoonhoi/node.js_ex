function add(a,b,callback){
  var result = a+b;
  callback(result);

  var count = 0;
  //함수가 다시 호출되어도 유지되는 상태
  //클로저?
  var history = function(){
    count+=1;
    return count + ' : '+a+'+'+b+'='+result;
  };
  return history;
}

var add_history = add(20,20,function(result) {
  console.log('더하기 결과 : '+result);
});
console.log('add_history의 자료형 : '+typeof(add_history));
console.log('결과값으로 받은 함수 실행 : '+add_history());
console.log('결과값으로 받은 함수 실행 : '+add_history());
console.log('결과값으로 받은 함수 실행 : '+add_history());
//결과값으로 받은 함수 실행 : 1 : 20+20=40
//결과값으로 받은 함수 실행 : 2 : 20+20=40
//결과값으로 받은 함수 실행 : 3 : 20+20=40
