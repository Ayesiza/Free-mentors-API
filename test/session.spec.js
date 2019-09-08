import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';
import {mentorData} from './testData'
import {sessionData} from './testData'


const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('Tests session routes', () => {
    let token = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(mentorData[0])
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('create Mentorship session', (done) => {
        request(app)
            .post('/api/v1/sessions')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[0])
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    });
    it('create Mentorship session', (done) => {
        request(app)
            .post('/api/v1/sessions')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[0])
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('You cannot ask this mentor the same question');
                done();
            });
    });
    it('reject mentorship session for  only mentor', (done) => {
        request(app)
            .patch('/api/v1/sessions/1/reject')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.message.should.equal('for only mentor');
                done();
            });
    });
});

describe('Tests mentoship  sessions routes', () => {
    let token = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(sessionData[2])
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('accept mentorship session', (done) => {
        request(app)
            .patch('/api/v1/sessions/2/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    });
    it('Not accept session already accepted', (done) => {
        request(app)
            .patch('/api/v1/sessions/2/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('Session Already Accepted');
                done();
            });
    });
    
    it('accept mentorship session', (done) => {
        request(app)
            .patch('/api/v1/sessions/9/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
    });
    it('session request not for mentor', (done) => {
        request(app)
            .patch('/api/v1/sessions/3/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.message.should.equal('not your session request');
                done();
            });
    });
    it('reject mentorship session', (done) => {
        request(app)
            .patch('/api/v1/sessions/1/reject')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    });
    it('reject mentorship session', (done) => {
        request(app)
            .patch('/api/v1/sessions/10/reject')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
    });
});

describe('Tests Review session routes', () => {
    let token = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send(mentorData[0])
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('Review mentor', (done) => {
        request(app)
            .post('/api/v1/sessions/2/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(201);
                done();
            });
    });
    it('Review session you cannot review yourself', (done) => {
        request(app)
            .post('/api/v1/sessions/1/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('you can not review yourself');
                done();
            });
    });
    it('Review session you cannot review your own session', (done) => {
        request(app)
            .post('/api/v1/sessions/3/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('you canot review some ones session');
                done();
            });
    });
    it('Review session not review session again', (done) => {
        request(app)
            .post('/api/v1/sessions/2/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('you can not review again');
                done();
            });
    });
});
