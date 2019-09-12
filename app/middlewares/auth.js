import User from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

dotenv.config();
class Auth {
  static getToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ status_code: 403, error: 'provide a token' });
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }

  static verifyUserToken(req, res, next) {
    jwt.verify(req.token, process.env.SECRETE_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: 403, message: err.message });
      req.user = user
      next();
    })
  }

  static userAdmin(req, res, next) {
    !req.user.admin ? res.status(403).send({ status_code: 403, error: 'for only admin' }) : next()
  }

  static userMentor(req, res, next) {
    if (req.user.mentor === false) return res.status(403).send({ status_code: 403, error: 'for only mentor' });
    next();
  }


  static sessionOwner(req, res, next) {
    if (req.session.mentor_id !== req.user.id) return res.status(403).send({ status_code: 403, error: 'not your session request' });
  
    next();
  }
  static noMentorToCreateSession(req,res,next){
    if(req.user.mentor === true) return res.status(400).send({status_code:400,error:'As a mentor you can not create own session'})
    next()
  }
  static noMentorViewToMentor(req,res,next){
    if(req.user.mentor === true) return res.status(400).send({status_code:400,error:'You can not view fellow mentors'})
    next()
  }

  static async checkIfUserExist(req, res, next) {
    const { email } = req.body;
    const finduser = await User.getUserByEmail(email);
    if (finduser.rows[0]) return res.status(409).send({ status_code: 409, error: 'user already exist' })
    next();
  }
 

  static async checkIfUserNotExist(req, res, next) {
    const user = await User.getUserByEmail(req.body.email);
    if (!user.rows[0]) return res.status(404).send({ status_code:404, error: 'user not found' });
    const hashedpassword = bcrypt.compareSync(req.body.password, user.rows[0].password)
    if (!hashedpassword) return res.status(400).send({ status_code:400, error: 'wrong email or password' })
    const {id,first_name,last_name,admin,email,mentor} = user.rows[0]
    req.token = jwt.sign({id,first_name,last_name,admin,email,mentor}, process.env.SECRETE_KEY, { expiresIn: '240hr' });
    req.user = user.rows[0]
    next();
  }

  static checkParamsInPut(req, res, next) {
    const checkInput = req.params.id.match(/^[0-9]+$/);
    if (!checkInput) return res.status(400).send({ status_code: 400, error: 'parameter should be a valid number' })
    next();
  }

  static async getUserById(req, res, next) {
    const user = await User.getUserById(req.params.id)
    if (!user.rows[0]) return res.status(404).send({ status_code: 404, error: 'user of the given Id not found' })
    req.user = user.rows[0]
    next();
  }

  
  static validation(req, res, next) {

    const authSchema = Joi.object().keys({
      first_name: Joi.string().trim().min(3).regex(/^[a-zA-Z]+$/).required(),
      last_name: Joi.string().trim().min(3).regex(/^[a-zA-Z]+$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      address: Joi.string().min(3).regex(/^[a-zA-Z0-9]+$/).required(),
      bio: Joi.required(),
      occupation: Joi.required(),
      expertise: Joi.required(),
      admin: Joi.required(),
      mentor: Joi.required(),

    });
    const data = Joi.validate(req.body, authSchema);

    if (data.error) {
      const resFomart = data.error.details[0].message.replace('"', '').split('"');
      const gotElem = resFomart[0];
      return res.status(400).send({ status_code: 400, error: `${gotElem} field is invalid` });
    }
    next();
  }

  

  
}


export default Auth;