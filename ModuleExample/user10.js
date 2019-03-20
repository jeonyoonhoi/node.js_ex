//프로토 타입을 만들어서 해보쟙
//8과 다른점
function User(id,name){
  this.id=id;
  this.name=name;
}

User.prototype.getUser = function() {
  return{id:this.id, name:this,name};
};

User.prototype.group = {id:'group01', name:'친구'};

User.prototype.printUser = function(){
  console.log('user 이름 : '+ this.name + ', group : '+this.group.name);
};

module.exports = User;
//new를 사용하지 않고 객체 자체를 리턴
