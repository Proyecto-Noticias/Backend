let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');
// const TEST_BEARER = "Bearer " + process.env.TEST_BEARER


chai.use(chaiHttp);


describe('News endpoints tests: ', () => {
    it('Should get every news', (done) => {
        chai.request(server)
            .get('/api/news')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.news.docs).be.a('array');
                done();
            });
    })
})