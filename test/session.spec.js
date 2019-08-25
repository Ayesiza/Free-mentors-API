import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('Tests session routes', () => {
    let token = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                email: 'sherifa@gmail.com',
                password: 'mogansherif2020'
            })
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
            .send({
                mentorId: 40,
                questions: 'Which leadership skills were the most difficult to develop?'
            })
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    });
    it('reject mentorship session for mentor', (done) => {
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
            .send({
                email: 'martin@gmail.com',
                password: 'kimmartin30'
            })
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
    it('accept mentorship session', (done) => {
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