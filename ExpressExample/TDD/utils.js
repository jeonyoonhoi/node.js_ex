function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalize : capitalize
  //밖에서 쓰는 이름 : 내보내는 함수
};

//TDD가 무엇이냐?
//소스코드를 작성하지 않고 테스트 코드를 만들고 하나하나 통과시키면서 개발한다.
//개발 시간은 많이 걸리지만, 프로젝트의 유지ㅣ 및 보수에 긍정적인 효과를 낸다.
//장점은 유지 보수 시간이 단축된다.

//mocha 는 테스트 코드를 돌려주는 테스트 러너이다.
//
