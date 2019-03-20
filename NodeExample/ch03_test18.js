var person1 = {name : '소녀시대',age:20};

function Person(name, age){
  this.name=name;
  this.age=age;
}//속성이 정의가 되고 파라미터로 받은 값을 할당한다.
//함수처럼 보이지만 Person()을 붕어빵 틀로 쓸것이다.

Person.prototype.walk = function(speed) {
  console.log(speed + 'km속도로 걸어갑니다.');
};
//이걸 객체로 본다면

var person3 = new Person('소녀시대',20);
person3.walk(10);
//person3.이라는 객체는 new라는 객체지향에서 사용하는 연산자로 만듦
