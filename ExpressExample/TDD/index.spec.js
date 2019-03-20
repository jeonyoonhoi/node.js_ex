const app =  require('./index');
const request = require('supertest');
const should = require('should');
//supertest를 request 에 담으면 리퀘스트 보내고 레르펀스를 반환한다.
// index 를 모듈로 받아왔다. 앱에
//nodejs 는 자바 기반의 서버의 백엔드 코드를 짜기 위해 사용


//'mocha' 라이브러리에서 제공
//describe는 환경이고 it은 테스트를 돌리는 코드
describe('성공시', ()=>{
  describe('GET /users는', ()=>{
    // 성공, get으로 들어왔을 때의 환경
    it('유저 객체를 담은 배열로 응답한다.',(done)=>{
      request(app)
        .get('/users')
        .end((err,res)=>{
          res.body.should.be.instanceOf(Array);
          //어레이가 맞는가를 물어보고
          //done 함수 done호출은 비동기 방식으로 동작, 끝내주기가 필요하다.
          done();
        });
    });

    it('최대 limit 갯수만큼 응답힌다. ', (done)=>{
      request(app)
        .get('/users?limit=2')
        .end((err,res)=>{
          res.body.should.have.lengthOf(2);
          //get(쿼리문)
          done();
        });
    });
  });

  describe('실패시',function(){
    it('limit이 숫자형이 아니면 400 을 리턴한다. ', function (done){
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });
  });
});
