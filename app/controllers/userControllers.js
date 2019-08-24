import jwt from 'jsonwebtoken';
import User from '../models/users';
import  { users } from '../data/userData'

export class UserController{
static signUpUser (req,res){
  const {firstName, lastName, email, password, address, bio, occupation, expertise, admin, mentor} = req.body;
  const id = users.length + 1;
  const user = new User(id,firstName,lastName,email,password,address, bio, occupation, expertise,admin, mentor)
  const token = jwt.sign({user}, 'tesyuseyeyseyuwu', { expiresIn: '24hr' });
  user.signUpUser()
   return res.status(201).send({status:201, token, message:'User created successfully'});
};

static signInUser(req,res){
  return res.send({status:200,message:'User is successfully logged in', token:req.token})
}

 static getAllMentors(req,res){
   const mentors = User.getAllMentors() 
  return res.send({status:200, mentors})  

   }
  
  static specificMentor(req,res){ 
    return res.send({status:200, user:req.user})
    
  }
        
static changeUserToMentor(req,res){
  if(req.user.mentor === true) return res.send({status:409, message:'User is already a mentor'})
  User.changeUserToMentor(req.user)
    return res.send({status:200, message:'User account changed to mentor'})  
  }
}
export default UserController;
