import jwt from 'jsonwebtoken';
import {users} from '../models/users';

export class UserController{
signUpUser (req,res){
    const {firstName, lastName, email, password, address, bio, occupation, expertise, admin, mentor} = req.body;
    const id = users.length + 1;
    const user = {id, firstName,lastName,email,password,address, bio, occupation, expertise,admin, mentor}
    const token = jwt.sign({id, firstName,lastName,email,address, bio, occupation, expertise, admin, mentor}, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
    const finduser = users.find(user => user.email === email);
    if(finduser) return res.status(409).send({status:409, message:'user already exist'})
        users.push(user);
        user.token = token;
        res.status(201).send({status:201,message:'User created successfully',id,token});
  };
  signInUser(req,res){
      const user = users.find(user => user.email === req.body.email);
      if(!user)return res.status(404).send({message:'user not found'});
      if(user.password !== req.body.password) return res.status(400).send({message:'wrong email or password'})
      const token = jwt.sign(user, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
      user.token = token;
      res.send({status:200,message:'User is successfully logged in', token})
    }
 getAllMentors(req,res){
        const mentors =  users.filter(user =>user.mentor === true )
         res.send({status:200, mentors})
        }
        
changeUserToMentor(req,res){
    const checkInput = req.params.id.match(/^[0-9]+$/);
    if (!checkInput) return res.status(400).send({ error: 400, message: 'parameter should be a valid number' });
   const user =users.find(c => c.id === parseInt(req.params.id))
   if(!user) return res.status(404).send({status:404, message:'user of the given Id not found'})
   if(user.mentor === true) return res.send({status:409, message:'User is already a mentor'})
   user.mentor = true
   res.send({status:200, message:'User account changed to mentor'})
}

specificMentor(req,res){
    const checkInput = req.params.id.match(/^[0-9]+$/);
    if(!checkInput) return res.status(400).send({error:400, message:'parameter should be a valid number'})
    const user = users.find(a => a.id === parseInt(req.params.id))
    if(!user) return res.status(404).send({status:404, message:'user of the given Id not found'})
    if(user.mentor === false) return res.status(400).send({status:400, message:'user is not a mentor'}) 
    res.send({status:200, message:'specific mentor found', user}) 
  };

}