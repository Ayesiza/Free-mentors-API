import { users }from '../models/users';
import { sessions }from '../models/sessions';
const appSecretkey = 'tesyuseyeyseyuwu'
 import jwt from 'jsonwebtoken';

 export function getToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ error: 403, message: 'provide a token' });
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }

  export const verifyUserToken =(req, res, next) =>{
    jwt.verify(req.token, appSecretkey, (err, user) => {
     if (err) return res.status(403).json({ error: 403, message: err.message });
     req.user = user
     next();
    })
   }

   export const userAdmin = (req, res, next)=> {
    !req.user.admin ? res.status(403).send({error:403,message:'for only admin'}) : next()
  }

export const userMentor = (req, res, next)=> {
  if( req.user.mentor === false) return res.status(403).send({error:403,message:'for only mentor'});
  next()
}

export const validation = (req, res, next)=> {
    // validate matches
    if(!req.body.firstName.match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'firstName is invalid'})
    if(!req.body.lastName.match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'lastName is invalid'})
    if(!req.body.password.match(/^[a-zA-Z0-9]{6,30}$/)) return res.status(400).send({error:400, message:'password is invalid'})
    if(!req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.status(400).send({error:400, message:'email is invalid'})
   
    next()
}

    