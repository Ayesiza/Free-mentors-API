import express from 'express'
import { signUpUser, signInUser, getAllMentors,changeUserToMentor, specificMentor } from '../controllers/userControllers'
import { getToken,validation, verifyUserToken, userAdmin } from '../middlewares/auth'



const router = express.Router()

router.post('/users/auth/signup', validation, signUpUser);
router.post('/users/auth/signin', signInUser);
router.patch('/user/:id',  getToken, verifyUserToken,userAdmin, changeUserToMentor);
router.get('/mentors', getToken, getAllMentors);
router.get('/mentor/:id', getToken, specificMentor);


export default router;