import User from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';

dotenv.config();
class Auth {
  static getToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ error: 403, message: 'provide a token' });
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
    !req.user.admin ? res.status(403).send({ error: 403, message: 'for only admin' }) : next()
  }

  static userMentor(req, res, next) {
    if (req.user.mentor === false) return res.status(403).send({ error: 403, message: 'for only mentor' });
    next();
  }


  static sessOwner(req, res, next) {
    if (req.session.mentorId !== req.user.id) return res.status(403).send({ error: 403, message: 'not your session request' });
    next();
  }

  static checkIfUserExist(req, res, next) {
    const { email } = req.body;
    const finduser = User.getUserByEmail(email);
    if (finduser) return res.status(409).send({ status: 409, message: 'user already exist' })
    next();
  }


  static async checkIfUserNotExist(req, res, next) {
    const fetch_data = await User.getUserByEmail(req.body.email);
    let user = fetch_data.rows[0];
    if (!user) return res.status(404).send({ message: 'user not found' });
    const hashedpassword = bcrypt.compareSync(req.body.password, user.password)
    const { password, ...noA } = user;
    if (!hashedpassword) return res.status(400).send({ message: 'wrong email or password' })
    req.token = jwt.sign(noA, process.env.SECRETE_KEY, { expiresIn: '240hr' });
    next();
  }

  static checkParamsInPut(req, res, next) {
    const checkInput = req.params.id.match(/^[0-9]+$/);
    if (!checkInput) return res.status(400).send({ error: 400, message: 'parameter should be a valid number' })
    next();
  }

  static getUserById(req, res, next) {
    const user = User.getUserById(req.params.id)
    if (!user) return res.status(404).send({ status: 404, message: 'user of the given Id not found' })
    req.user = user
    next();
  }


  static validation(req, res, next) {

    const authSchema = Joi.object().keys({
      firstName: Joi.string().trim().min(3).regex(/^[a-zA-Z]+$/).required(),
      lastName: Joi.string().trim().min(3).regex(/^[a-zA-Z]+$/).required(),
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
      return res.status(400).send({ status: 400, message: `${gotElem} field is invalid` });
    }
    next();
  }
}


export default Auth;