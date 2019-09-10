import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';
import { mentorData, authData, sessionData }from './testData'

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('Tests session routes', () => {
    let userToken = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signup')
            .send(authData[7])
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });
    it('create Mentorship session', (done) => {
        request(app)
            .post('/api/v1/sessions')
            .set('Authorization', `Bearer ${userToken}`)
            .set('Accept', 'application/json')
            .send(sessionData[0])
            .end((err, res) => {
                res.status.should.equal(200);

                done();
            });
    });
    it('create Mentorship session2', (done) => {
        request(app)
            .post('/api/v1/sessions')
            .set('Authorization', `Bearer ${userToken}`)
            .set('Accept', 'application/json')
            .send(sessionData[5])
            .end((err, res) => {
                res.status.should.equal(200);

                done();
            });
    });
    it('create Mentorship session session aready exist', (done) => {
        request(app)
            .post('/api/v1/sessions')
            .set('Authorization', `Bearer ${userToken}`)
            .set('Accept', 'application/json')
            .send(sessionData[0])
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('session already exists');
                done();
            });
    });

    it('reject mentorship session for  only mentor', (done) => {
        request(app)
            .patch('/api/v1/sessions/1/reject')
            .set('Authorization', `Bearer ${userToken}`)
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
            .send(sessionData[4])
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('accept mentorship session', (done) => {
        request(app)
            .patch('/api/v1/sessions/1/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(200);

                done();
            });
    });
    it('Not accept session already accepted', (done) => {
        request(app)
            .patch('/api/v1/sessions/1/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(409);
                res.body.message.should.equal('Session Already Accepted');
                done();
            });
    });
    it('session request not for this mentor', (done) => {
        request(app)
            .patch('/api/v1/sessions/2/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.message.should.equal('not your session request');
                done();
            });
    });
    it('accept mentorship session not exit', (done) => {
        request(app)
            .patch('/api/v1/sessions/9/accept')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(404);
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
    it('reject mentorship session not exist', (done) => {
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
            .send(sessionData[4])
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('Review mentor', (done) => {
        request(app)
            .post('/api/v1/sessions/1/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                
                res.body.message.should.equal('you  review yourself');
                done();
            });
    });
    it('Review session you cannot review yourself', (done) => {
        request(app)
            .post('/api/v1/sessions/2/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('you can not review yourself');
                done();
            });
    });
    it('Review session you cannot review someones session', (done) => {
        request(app)
            .post('/api/v1/sessions/2/review')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(sessionData[1])
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('you canot review some ones session');
                done();
            });
    });
    it('Review session not review again', (done) => {
        request(app)
            .post('/api/v1/sessions/18/review')
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