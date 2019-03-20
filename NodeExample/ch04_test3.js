var Calc = require('./calc3');
//Calc calc3에서 마듦

var calc1 = new Calc();
calc1.emit('stop');

console.log('Calc 에 stop 이벤트 전달함. ');
