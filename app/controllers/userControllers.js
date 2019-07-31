import jwt from 'jsonwebtoken';
import {users} from '../models/users';

export const signUpUser = (req,res) =>{
    const {firstName, lastName, email, password, address, bio, occupation, expertise} = req.body;
    const id = users.length + 1;
    const user = {id, firstName,lastName,email,password,address, bio, occupation, expertise}
    const token = jwt.sign({id, firstName,lastName,email,address, bio, occupation, expertise}, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
    const finduser = users.find(user => user.email === email);
    if(finduser) return res.status(409).send({status:409, message:'user already exist'})
        users.push(user);
        user.token = token;
        res.status(201).send({status:201,message:'User created successfully',id,token});
  };
  export const signInUser =(req,res) =>{
      const user = users.find(user => user.email === req.body.email);
      if(!user)return res.status(404).send({message:'user not found'});
      if(user.password !== req.body.password) return res.status(400).send({message:'wrong email or password'})
      const token = jwt.sign({email:user.email}, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
      user.token = token;
      res.send({status:200,message:'User is successfully logged in', token})
    }
