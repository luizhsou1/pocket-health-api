const supertest = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')

describe('Login', function () {

    it.only('should login with admin', function (done) {
        supertest(app)
            .post('/api/login')
            .send({
                'username': 'admin',
                'password': '123'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it.only('should return forbidden for unknown user', function (done) {
        supertest(app)
            .post('/api/login')
            .send({
                'username': 'admin2',
                'password': '123'
            })
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it.only('should return forbidden for known user and wrong password', function (done) {
        supertest(app)
            .post('/api/login')
            .send({
                'username': 'admin2',
                'password': '1234'
            })
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    afterAll(() => {
        mongoose.disconnect()
    })
});