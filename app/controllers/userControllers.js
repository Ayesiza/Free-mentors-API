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
  