var EventEmitter = require('events').EventEmitter;
//EventEmitter는 events 모듈 안에 정의되어 있다.
var util = require('util');//import같은 것
//util이용하면 prototype 객체를 쉽게 사용할 수 있음
// Calc 객체는 계산기 객체로서 function키워드를 사용해
//프로토타입 객체로 만든다.
var Calc = function(){
  //프로토 타입 객체 안에서는 this 키워드를 이용해 자기 자신을 가리킴
  this.on('stop',function(){
    console.log('Calc에 stop 이벤트 전달됨.');
  });
  //이 계산기 객체로 전달되는 stop이벤트를 처리하기 위해 Calc객체 안에서
  //on()메소드를 이용함
};
//Calc 객체가 EventEmitter를 사용하려면 상속을 받는다.
util.inherits(Calc, EventEmitter);
//add 함수를 사용할 수 있다.

Calc.prototype.add = function(a,b){
  return a+b;
};
//calc3.js 파일에 정의한 모듈을 불러들이는 쪽에서 Calc객체를 참조할 수 있도록

module.exports = Calc;
module.exports.title = 'calculator';
