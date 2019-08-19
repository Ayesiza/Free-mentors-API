import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);


describe('Tests session routes', () => {
    let token = '';
    before ((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                email: 'sherifa@gmail.com',
                password: 'sherifa5555'
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
});


describe('Tests mentoship  sessions routes', () => {
    let token = '';
    before ((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
            
                 email:'martin@gmail.com',
                 password:'martin5555'
           
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
});