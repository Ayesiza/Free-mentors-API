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
        firstName:'kelvin', 
        lastName:'bawer', 
        email:'kelvin@gmail.com',
        password:'kelvin5555', 
        address:'lagos', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of business' 
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
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
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
        firstName:'ja-ne', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
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
        firstName:'jane', 
        lastName:'jo-e', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
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
        firstName:'jane', 
        lastName:'joe', 
        email:'janegmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
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
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane-5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password is invalid');
        done();
      });
  });
  it('invalid datatype firstName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName: 60, 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('firstName must be a string');
        done();
      });
  });
  it('invalid datatype lastName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName: 80, 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('lastName must be a string');
        done();
      });
  });
  it('invalid datatype email', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:677,
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('email must be a string');
        done();
      });
  });
  it('invalid datatype password', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:9999, 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password must be a string');
        done();
      });
  });
  it('invalid datatype address', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address: 90, 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law'
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('address must be a string');
        done();
      });
  });
  it('invalid datatype bio', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 70,
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('bio must be a string');
        done();
      });
  });  
  it('invalid datatype occupation', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 90,
        expertise: 'student of law' 
       })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('occupation must be a string');
        done();
      });
  }); 
  it('invalid datatype expertise', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio:'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 90
       })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('expertise must be a string');
        done();
      });
  });  
  it('validate length input firstName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'j', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('firstName must be greater than 2');
        done();
      });
  });
  it('validate length input lastName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'j', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('lastName must be greater than 2');
        done();
      });
  });
  it('validate length input password', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'ja77', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password must be greater than 6');
        done();
      });
  });
  it('validate length input address', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'w', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('address must be greater than 2');
        done();
      });
  }); 
  it('validate required firstName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('firstName is required');
        done();
      });
  });
  it('validate required lastName', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('lastName is required');
        done();
      });
  });
  it('validate required password', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password is required');
        done();
      });
  });
  
  it('validate required email', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('email is required');
        done();
      });
  });
it('validate required address', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('address is required');
        done();
      });
  });
  it('validate required bio', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: '',
        occupation: 'unversity student',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('bio is required');
        done();
      });
  });
  it('validate required occupation', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: '',
        expertise: 'student of law' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('occupation is required');
        done();
      });
  });
  it('validate required expertise', (done) => {
    request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        firstName:'jane', 
        lastName:'joe', 
        email:'jane@gmail.com',
        password:'jane5555', 
        address:'wakiso', 
        bio: 'born in November 4, 1989',
        occupation: 'unversity student',
        expertise: '' 
        })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('expertise is required');
        done();
      });
  });
});
