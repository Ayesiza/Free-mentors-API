import { users }from '../data/userData';
import User from '../models/users';
import { sessions }from '../data/sessionData';
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
  next();
}

export const checkIfUserExist = (req, res,next) => {
  const finduser = User.getUserByEmail(req.body.email);
  if(finduser) return res.status(409).send({status:409, message:'user already exist'})
  next();
}


export const checkIfUserNotExist =(req,res,next) => {
  const user = User.getUserByEmail(req.body.email);
  if(!user)return res.status(404).send({message:'user not found'});
  if(user.password !== req.body.password) return res.status(400).send({message:'wrong email or password'})
  req.token = jwt.sign(user, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
  next();
}

export const checkParamsInPut = (req, res, next) => {
  const checkInput = req.params.id.match(/^[0-9]+$/);
  if(!checkInput) return res.status(400).send({error:400, message:'parameter should be a valid number'})
  next();
}

export const getUserById = (req,res,next) => {
  const user = User.getUserById(req.params.id)
  if(!user) return res.status(404).send({status:404, message:'user of the given Id not found'})
  req.user = user
next();
}
export const validation = (req, res, next)=> {
    
    if(!req.body.firstName.match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'firstName is invalid'})
    if(!req.body.lastName.match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'lastName is invalid'})
    if(!req.body.password.match(/^[a-zA-Z0-9]{6,30}$/)) return res.status(400).send({error:400, message:'password is invalid'})
    if(!req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.status(400).send({error:400, message:'email is invalid'})
   
    next()
}


    