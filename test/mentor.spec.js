import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);

describe('Tests usermentor routes', () => {
    let adminToken = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                email: 'sherifa@gmail.com',
                password: 'mogansherif2020'
            })
            .end((err, res) => {
                adminToken = res.body.token;
                done();
            });
    });

    it('changeUserToMentor', (done) => {
        request(app)
            .patch('/api/v1/user/1')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.message.should.equal('User account changed to mentor');
                done();
            });
    });

    it(' changeUserToMentor not exist', (done) => {
        request(app)
            .post('/api/v1/user/10')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.status.should.equal(404);

                done();
            });
    });

    it('changeUserToMentor invalid input', (done) => {
        request(app)
            .patch('/api/v1/user/b1')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('parameter should be a valid number');
                done();
            });
    });
    it('changeUserToMentor userId not found', (done) => {
        request(app)
            .patch('/api/v1/user/10')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.message.should.equal('user of the given Id not found');
                done();
            });
    });
    it('changeUserToMentor already mentor', (done) => {
        request(app)
            .patch('/api/v1/user/4')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {

                res.body.message.should.equal('User is already a mentor');
                done();
            });
    });
    it('changeUserToMentor verifyToken', (done) => {
        request(app)
            .patch('/api/v1/user/1')
            .set('Authorization', `Bearer userToken`)
            .end((err, res) => {
                res.status.should.equal(403);

                done();
            });
    });
});

describe('Tests all usermentor routes', () => {
    let userToken = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                email: 'betty@gmail.com',
                password: 'bettykimuli20'
            })
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });

    it('tests allMentors', (done) => {
        request(app)
            .get('/api/v1/mentors')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.status.should.equal(200);

                done();
            });
    });

    it('tests allMentors get token', (done) => {
        request(app)
            .get('/api/v1/mentors')
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.message.should.equal('provide a token');
                done();
            });
    });

    it('changeUserToMentor adminFalse', (done) => {
        request(app)
            .patch('/api/v1/user/1')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {

                res.body.message.should.equal('for only admin');
                done();
            });
    });
});

describe('Tests all specific mentor routes', () => {
    let userToken = '';
    before((done) => {
        request(app)
            .post('/api/v1/users/auth/signin')
            .send({
                email: 'betty@gmail.com',
                password: 'bettykimuli20'
            })
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });
    it('tests specificMentor', (done) => {
        request(app)
            .get('/api/v1/mentor/4')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    });
    it('specfic invalid param', (done) => {
        request(app)
            .get('/api/v1/mentor/t1')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.message.should.equal('parameter should be a valid number');
                done();
            });
    });

    it('specficMentor not found', (done) => {
        request(app)
            .get('/api/v1/mentor/10')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.message.should.equal('user of the given Id not found');
                done();
            });
    });
  
});