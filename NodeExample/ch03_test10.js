var users = [{name : '소녀시대', age : 20},{name : '걸스데이',age:22},
{name:'티아라',age:21}];

//c스타일 for문 --> 성능이 떨어진다. 
for(var i=0;i<users.length;i++){
  console.log('배열 원소 #'+i+':'+users[i].name);
}

//성능이 더 좋은 forEach()
users.forEach(function(elem, index){
  console.log('배열원소 #'+index+' : '+elem.name);
});
