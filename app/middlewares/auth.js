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
     next();
    })
   }
   export const userAdmin = (req, res, next)=> {
    jwt.verify(req.token, appSecretkey, (err, user) => {
     if (err) return res.status(403).json({ error: 403, message: err.message });
    if( user.admin === false) return res.status(403).send({error:403,message:'for only admin'});
    next();
  }) 
}
export const validation = (req, res, next)=> {

    // validate required
    if(!req.body.firstName) return res.status(400).send({error:400, message:'firstName is required'})
    if(!req.body.lastName) return res.status(400).send({error:400, message:'lastName is required'})
    if(!req.body.password) return res.status(400).send({error:400, message:'password is required'})
    if(!req.body.email) return res.status(400).send({error:400, message:'email is required'})
    if(!req.body.address) return res.status(400).send({error:400, message:'address is required'})
    if(!req.body.bio) return res.status(400).send({error:400, message:'bio is required'})
    if(!req.body.occupation) return res.status(400).send({error:400, message:'occupation is required'})
    if(!req.body.expertise) return res.status(400).send({error:400, message:'expertise is required'})

    // validate length input
    if(req.body.firstName.length < 2) return res.status(400).send({error:400, message:'firstName must be greater than 2'})
    if(req.body.lastName.length < 2) return res.status(400).send({error:400, message:'lastName must be greater than 2'})
    if(req.body.password.length < 6) return res.status(400).send({error:400, message:'password must be greater than 6'})
    if(req.body.address.length < 2) return res.status(400).send({error:400, message:'address must be greater than 2'})
    
    // invalid character/datatype validation
    if(typeof req.body.firstName !=='string') return res.status(400).send({error:400, message:'firstName must be a string'})
    if(typeof req.body.lastName !=='string') return res.status(400).send({error:400, message:'lastName must be a string'})
    if(typeof req.body.email !=='string') return res.status(400).send({error:400, message:'email must be a string'})
    if(typeof req.body.password !=='string') return res.status(400).send({error:400, message:'password must be a string'})
    if(typeof req.body.address !=='string') return res.status(400).send({error:400, message:'address must be a string'})
    if(typeof req.body.bio !=='string') return res.status(400).send({error:400, message:'bio must be a string'})
    if(typeof req.body.occupation !=='string') return res.status(400).send({error:400, message:'occupation must be a string'})
    if(typeof req.body.expertise !=='string') return res.status(400).send({error:400, message:'expertise must be a string'})
    
    // validate matches
    if(!req.body.firstName.match(/^[a-zA-Z]+$/)) return res.status(400).send({error:400, message:'firstName is invalid'})
    if(!req.body.lastName.match(/^[a-zA-Z]+$/)) return res.status(400).send({error:400, message:'lastName is invalid'})
    if(!req.body.password.match(/^[a-zA-Z0-9]+$/)) return res.status(400).send({error:400, message:'password is invalid'})
    if(!req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.status(400).send({error:400, message:'email is invalid'})
    
    next()
    }

    