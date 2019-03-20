//util에 있는 걸 가져오기 위해서는 가져와야 한다.
const utils = require('./utils');
//const assert = require('assert');
const should = require('should');

//변하지 않는 상수니까 const

//인자 2개(설명해주는 문자열, 콜백함수)
describe('utils의 capitalize 함수를 테스트 한다. ', ()=>{
  it('문자열의 첫번째 문자를 대문자로 바꿔준다.',()=>{
    const result = utils.capitalize('hello');
    //assert.equal(result, 'Hello');
    result.should.be.equal('Hello');

  });
});
``
