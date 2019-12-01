import {MongoMemoryServer} from 'mongodb-memory-server';

const supertest = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')
const assert = require("assert")
const mongod = new MongoMemoryServer()
let token = '';
let createdUserId = ''

describe('User', function () {

    beforeAll(async () => {
        const uri = await mongod.getConnectionString();
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    })

    beforeEach(function (done) {
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
                token = res.body.token
                done();
            });
    });

    it.only('should create user', function (done) {
        supertest(app)
            .post('/api/users')
            .send({
                'username': 'test',
                'name': 'test',
                'password': '1234',
                'admin': false
            })
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                createdUserId = res.body._id;
                done();
            });
    });


    it.only('should find user', function (done) {
        supertest(app)
            .get('/api/users/' + createdUserId)
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.name === 'test')
                assert(res.body.username === 'test')
                assert(res.body.admin === false)
                assert(res.body.password === '1234')
                done();
            });
    });

    it.only('should update user', function (done) {
        supertest(app)
            .put('/api/users/' + createdUserId)
            .send({_id: createdUserId, 'name': 'test2'})
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.name === 'test2')
                done();
            });
    });


    it.only('should return list of users', function (done) {
        supertest(app)
            .get('/api/users')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.length === 1, "Must have one user")
                done();
            });
    });


    it.only('should return not found for non existent user', function (done) {
        supertest(app)
            .get('/api/users/' + '5de4151c4d0b282e3fb16454')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(404, done);
    });

    afterAll(() => {
        mongoose.disconnect()
    })
});