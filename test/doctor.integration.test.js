import {MongoMemoryServer} from 'mongodb-memory-server';

const supertest = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')
const assert = require("assert")
const mongod = new MongoMemoryServer()
let token = '';
let createdDoctorId = ''

describe('Doctor', function () {

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

    it.only('should create doctor', function (done) {
        supertest(app)
            .post('/api/doctor')
            .send({
                'name': 'Mateus Ferreira',
                'cpf': '99999999999',
                'specialty': 'Cardiologist',
                'crm': '123456',
                'work': 'Hospital Santa Clara',
                'consultValue': 500

            })
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                createdDoctorId = res.body._id;
                done();
            });
    });


    it.only('should find doctor', function (done) {
        supertest(app)
            .get('/api/doctor/' + createdDoctorId)
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.name === 'Mateus Ferreira')
                assert(res.body.cpf === '99999999999')
                assert(res.body.specialty === 'Cardiologist')
                assert(res.body.crm === 123456)
                assert(res.body.work === 'Hospital Santa Clara')
                assert(res.body.consultValue === "500")
                done();
            });
    });

    it.only('should update doctor', function (done) {
        supertest(app)
            .put('/api/doctor/' + createdDoctorId)
            .send({_id: createdDoctorId, 'consultValue': 600})
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.consultValue === "600")
                done();
            });
    });


    it.only('should return list of doctor', function (done) {
        supertest(app)
            .get('/api/doctor')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                assert(res.body.length === 1, "Must have one doctor")
                done();
            });
    });


    it.only('should return not found for non existent doctor', function (done) {
        supertest(app)
            .get('/api/doctor/' + '5de4151c4d0b282e3fb16454')
            .set('x-access-token', token)
            .set('Accept', 'application/json')
            .expect(404, done);
    });

    afterAll(() => {
        mongoose.disconnect()
    })
});