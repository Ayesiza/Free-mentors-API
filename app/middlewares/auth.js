import User from '../models/users';
 import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 import bcrypt from 'bcrypt';

dotenv.config();

 export function getToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ error: 403, message: 'provide a token' });
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }

  export const verifyUserToken =(req, res, next) =>{
    jwt.verify(req.token, process.env.appSecretkey,(err, user) => {
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


export const sessOwner = (req, res, next)=> {
  if (req.session.mentorId !== req.user.user.id) return res.status(403).send({error:403,message:'not your session request'});
  next();
}

export const checkIfUserExist = (req, res,next) => {
  const finduser = User.getUserByEmail(req.body.email);
  if(finduser) return res.status(409).send({status:409, message:'user already exist'})
  next();
}

export const checkIfUserNotExist = (req,res,next) => {
  const user = User.getUserByEmail(req.body.email);
  if(!user)return res.status(404).send({message:'user not found'});
  if(!bcrypt.compareSync(req.body.password,user.password)) return res.status(400).send({message:'wrong email or password'})  
  req.token = jwt.sign({user}, process.env.appSecretkey, { expiresIn: '24hr' });
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
    
    if(!req.body.firstName.trim().match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'firstName is invalid'})
    if(!req.body.lastName.trim().match(/^[a-zA-Z]{3,30}$/)) return res.status(400).send({error:400, message:'lastName is invalid'})
    if(!req.body.password.trim().match(/^[a-zA-Z0-9]{6,30}$/)) return res.status(400).send({error:400, message:'password is invalid'})
    if(!req.body.email.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.status(400).send({error:400, message:'email is invalid'})
   
    next()
}


    