import express from 'express'
import { signUpUser, signInUser, getAllMentors,changeUserToMentor, specificMentor } from '../controllers/userControllers'
import { getToken,validation, verifyUserToken, userAdmin, userMentor} from '../middlewares/auth'
// import { userMentor } from '../middlewares/session'
import { createSession, acceptMentorshipSession } from '../controllers/sessionsConrollers'


const router = express.Router()

router.post('/users/auth/signup', validation, signUpUser);
router.post('/users/auth/signin', signInUser);
router.patch('/user/:id',  getToken, verifyUserToken,userAdmin, changeUserToMentor);
router.get('/mentors', getToken, getAllMentors);
router.get('/mentor/:id', getToken, specificMentor);
router.post('/sessions',getToken, verifyUserToken, createSession);
router.patch('/sessions/:id/accept', getToken, verifyUserToken, userMentor, acceptMentorshipSession);



export default router;