import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('auth routes', () => {
    it('signUp first time user', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'kelvin',
                lastName: 'bawer',
                email: 'kelvin@gmail.com',
                password: 'kelvin5555',
                address: 'lagos',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of business',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(201);
                res.body.message.should.equal('User created successfully');
                done();
            });
    });
    it('test signUp ifUserExist', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'jane',
                lastName: 'joe',
                email: 'jane@gmail.com',
                password: 'jane5555',
                address: 'wakiso',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of law',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('user already exist');
                done();
            });
    });
    it('invalid inputs firstName', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'ja-ne',
                lastName: 'joe',
                email: 'jane@gmail.com',
                password: 'jane5555',
                address: 'wakiso',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of law',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('firstName is invalid');
                done();
            });
    });
    it('invalid inputs lastName', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'jane',
                lastName: 'jo-e',
                email: 'jane@gmail.com',
                password: 'jane5555',
                address: 'wakiso',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of law',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('lastName is invalid');
                done();
            });
    });
    it('invalid inputs email', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'jane',
                lastName: 'joe',
                email: 'janegmailcom',
                password: 'jane5555',
                address: 'wakiso',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of law',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('email is invalid');
                done();
            });
    });
    it('invalid inputs password', (done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send({
                firstName: 'jane',
                lastName: 'joe',
                email: 'jane@gmail.com',
                password: 'jane',
                address: 'wakiso',
                bio: 'born in November 4, 1989',
                occupation: 'unversity student',
                expertise: 'student of law',
                admin: false,
                mentor: false
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('password is invalid');
                done();
            });
    });
   
    it('signIn/login success', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                "email": "jane@gmail.com",
                "password": "jane5555"
            })
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.message.should.equal('User is successfully logged in');
                done();
            });
    });
    it('signIn is user not exist', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                "email": "keneth@gmail.com",
                "password": "keneth5555"
            })
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.message.should.equal('user not found');
                done();
            });
    });

    it('signIn on wrong details', (done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                "email": "jane@gmail.com",
                "password": "jan5668"
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('wrong email or password');
                done();
            });
    });

});