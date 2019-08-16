import express from 'express'
import request from 'supertest';
import should from 'should';
import apiRouters from '../app/routers/apiRouters';

const app = express();

app.use(express.json());

app.use('/api/v1/', apiRouters);


describe('Tests user-mentor routes', () => {
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
    it('changeUserToMentor', (done) => {
        request(app)
            .patch('/api/v1/user/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.message.should.equal('User account changed to mentor');
                done();
            });
    });
    it(' changeUserToMentor not exist', (done) => {
    request(app)
    .post('/api/v1/user/10')
     .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
        res.status.should.equal(404);

      done();
    });
  });
  it('tests allMentors', (done) => {
    request(app)
        .get('/api/v1/mentors')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            res.status.should.equal(200);
           
            done();
        });
     });

});