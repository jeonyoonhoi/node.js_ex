process.on('tick',function(count){
  console.log('tick 이벤트 발생함 : '+count);
});
//process 라는 객체를 이용
//function 은 콜백함수, 사용볍 잘 생각할것

setTimeout(function() {
  console.log('2초 후에 실행되었음.');

  process.emit('tick','2');
},2000);
