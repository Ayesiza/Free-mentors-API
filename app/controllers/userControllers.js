import jwt from 'jsonwebtoken';
import User from '../models/users';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import 'regenerator-runtime';




dotenv.config();

export class UserController {
  static async signUpUser(req, res) {
try{
    const { first_name, last_name, email, address, bio, occupation, expertise, admin, mentor } = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User(first_name, last_name, email, hashPassword, address, bio, occupation, expertise, admin, mentor)
    const createdUser = await user.signUpUser()
    const { id } = createdUser.rows[0]
    const token = jwt.sign({id, email, admin, mentor,first_name, last_name}, process.env.SECRETE_KEY, { expiresIn: '240hr' });
    const { password, ...noA } = createdUser.rows[0];
    return res.status(201).send({ status_code: 201, message: 'User created successfully',data:noA,token});
  } catch (error){
    return res.status(400).send({status_code:400, message:error.message});
  }
  };


  static signInUser(req, res) {
    const { password, ...noA } = req.user;
    return res.send({ status_code: 200, message: 'User is successfully logged in',data:noA, token: req.token })
  }

  static changeUserToMentor(req, res) {
    if (req.user.mentor === true) return res.send({ status_code: 409, error: 'User is already a mentor' })
    User.changeUserToMentor(req.user.id)
    return res.send({ status_code: 200, message: 'User account changed to mentor' })
  }

  static async getAllMentors(req, res) {
    const mentors = await User.getAllMentors()
    let data = [];
    for (let mentor = 0; mentor < mentors.rows.length; mentor++) {
      const { password, ...noA } = mentors.rows[mentor];
      data.push(noA)
    }
    return res.send({ status_code: 200, data})

  }

 
  static specificMentor(req, res) {
    if (req.user.mentor === false) return res.status(400).send({ status_code: 400, error: 'selected user is  not a mentor' })
    const { password, ...noA } = req.user;
    return res.send({ status_code: 200, user: noA })

  }

 
}
export default UserController;
