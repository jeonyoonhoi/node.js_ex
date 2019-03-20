var users = [{name : '소녀시대',age:20},{name : '걸스데이',age : 22}
,{name:'티아라',age:21}];

//배열 중간 삭제할 떄는 delete를 잘 쓰지 않는다.
delete users[1];
console.dir(users);
users.forEach(function(elem,index){
  console.log('원소 #'+index);
  console.dir(elem);
});

//중간에 원소 삭제, 추가 등
//parameter가 중요함 중간의 어디니 인덱스 어디부터니
//parameter2 0 이면 추가 그 다음은 삭제 개수

users.splice(1,0,{name : '에프터스쿨',age : 24});
console.dir(users);

users.splice(2,1);
console.dir(users);
