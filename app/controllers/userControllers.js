import jwt from 'jsonwebtoken';
import User from '../models/users';
import { users } from '../data/userData'

import dotenv from 'dotenv';
import bcrypt from 'bcrypt';




dotenv.config();

export class UserController {
  static async signUpUser(req, res) {
try{
    const { firstName, lastName, email, address, bio, occupation, expertise, admin, mentor } = req.body;
    const id = users.length + 1;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User(id, firstName, lastName, email, hashPassword, address, bio, occupation, expertise, admin, mentor)
    const token = jwt.sign({ id, email, admin, mentor }, process.env.SECRETE_KEY, { expiresIn: '240hr' });
  await user.signUpUser()
    return res.status(201).send({ status: 201, token, message: 'User created successfully' });
  } catch (error){
    return res.status(400).send({status:400, message:error.message});
  }
  };


  static signInUser(req, res) {
    return res.send({ status: 200, message: 'User is successfully logged in', token: req.token })
  }

  static changeUserToMentor(req, res) {
    if (req.user.mentor === true) return res.send({ status: 409, message: 'User is already a mentor' })
    User.changeUserToMentor(req.user.id)
    return res.send({ status: 200, message: 'User account changed to mentor' })
  }

  static async getAllMentors(req, res) {
    const mentors = await User.getAllMentors()
    let data = [];
    for (let mentor = 0; mentor < mentors.rows.length; mentor++) {
      const { password, ...noA } = mentors.rows[mentor];
      data.push(noA)
    }
    return res.send({ status: 200, data})

  }

 
  static specificMentor(req, res) {
    if (req.user.mentor === false) return res.send({ status: 404, message: 'Selected User is  not a mentor' })
    const { password, ...noA } = req.user;
    return res.send({ status: 200, user: noA })

  }

 
}
export default UserController;
