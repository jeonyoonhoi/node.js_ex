//process 는 전역
process.on('exit',function(){
  console.log()
});
//이벤드 받아서 처리

setTimeout(function() {
  console.log('2초 후에 실행되었음.');
  process.exit();
},2000);

 console.log('2초 후에 실행될 것임. ');
