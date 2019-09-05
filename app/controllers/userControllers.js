import jwt from 'jsonwebtoken';
import User from '../models/users';
import  { users } from '../data/userData'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import 'regenerator-runtime'

dotenv.config();

export class UserController{
static async signUpUser (req,res){
  const {firstName, lastName, email, password, address, bio, occupation, expertise, admin, mentor} = req.body;
  const id = users.length + 1;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  const user = new User(id,firstName,lastName,email,hashedPassword,address, bio, occupation, expertise,admin, mentor)
console.log(user)
  const token = jwt.sign({user}, process.env.appSecretKey, { expiresIn: '24hr' });
  user.signUpUser()
   return res.status(201).send({status:201,token, message:'User created successfully'});
};

static signInUser(req,res){
  return res.send({status:200,message:'User is successfully logged in', token:req.token})
}


 static getAllMentors(req,res){
   const data = User.getAllMentors() 
  return res.send({status:200, data})  

   }
  
  static specificMentor(req,res){ 
    if( req.user.mentor === false) return res.send({status:404, message:'Selected User is  not a mentor'})
    return res.send({status:200, user:req.user})
    
  }
        
static changeUserToMentor(req,res){
  if(req.user.mentor === true) return res.send({status:409, message:'User is already a mentor'})
  User.changeUserToMentor(req.user)
    return res.send({status:200, message:'User account changed to mentor'})  
  }
}
export default UserController;
