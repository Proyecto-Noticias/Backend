let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');
const TEST_BEARER = "Bearer " + process.env.TEST_BEARER

chai.use(chaiHttp);

describe('User endpoints: ', () => {
    it('Should get every user', (done) => {
        chai.request(server)
            .get('/api/user')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.users).be.a('array');
                done();
            });
    });
    it('Should get one user', (done) => {
        chai.request(server)
            .get('/api/user/5f90d3de7180e5094eb18313')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should create a user', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                _id: "5f93b90b05d455066fa36823",
                firstName: "test",
                lastName: "test",
                email: `test@test.com`,
                country: "test",
                password: "P4ssword",
                isVerified: true
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });
    it('Should login a user', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                email: `test@test.com`,
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should not create a user cuz email is duplicated', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "Firstname",
                lastName: "Lastname",
                email: `test@test.com`,
                country: "Mexico",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });
    it('Should not create a user cuz firstName doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "",
                lastName: "Lastname",
                email: `test@test.com`,
                country: "Mexico",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not create a user cuz lastName doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "Firstname",
                lastName: "",
                email: `test@test.com`,
                country: "Mexico",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not create a user cuz email doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "Firstname",
                lastName: "Lastname",
                email: ``,
                country: "Mexico",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not create a user cuz email doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "Firstname",
                lastName: "Lastname",
                email: `email@email.com`,
                country: "",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not create a user cuz email doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/signup')
            .send({
                firstName: "Firstname",
                lastName: "Lastname",
                email: `email@email.com`,
                country: "Mexico",
                password: "password"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not delete an user for missing authentication', (done) => {
        chai.request(server)
            .delete('/api/user/5f93b78ddfdc3f057f784cd8')
            .end((err, res) => {
                expect(res).to.have.status(407);
                done();
            });
    });
    it('Should update an user', (done) => {
        chai.request(server)
            .patch('/api/user/5f93b90b05d455066fa36823')
            .set("authorization", TEST_BEARER)
            .send({ // You can add here every field
                firstName: "Test",
                lastName: "Test"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                console.log(res.body.message);
                done();
            });
    });
    it('Should delete an user', (done) => {
        chai.request(server)
            .delete('/api/user/5f93b90b05d455066fa36823')
            .set("authorization", TEST_BEARER)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });    
});