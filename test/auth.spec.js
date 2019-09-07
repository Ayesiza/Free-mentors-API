import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';
import {authData} from './testData'

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('auth routes', () => {
    it('signUp first time user', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send(authData[0])
            .end((err, res) => {
                res.status.should.equal(201);
                res.body.message.should.equal('User created successfully');
                done();
            });
    });
    it('test signUp ifUserExist', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send(authData[1])
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('user already exist');
                done();
            });
    });
    it('invalid inputs firstName', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send(authData[2])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal("firstName field is invalid");
                done();
            });
    });
   
    it('signIn/login success', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(authData[3])
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.message.should.equal('User is successfully logged in');
                done();
            });
    });
    it('signIn is user not exist', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(authData[4])
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.message.should.equal('user not found');
                done();
            });
    });

    it('signIn on wrong details', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(authData[5])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('wrong email or password');
                done();
            });
    });

});