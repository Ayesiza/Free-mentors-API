import express from 'express'
import user from '../controllers/userControllers'
import { getToken,validation, verifyUserToken, userAdmin, userMentor} from '../middlewares/auth'
// import { userMentor } from '../middlewares/session'
import session  from '../controllers/sessionsConrollers'

const router = express.Router()

router.post('/users/auth/signup', validation, user.signUpUser);
router.post('/users/auth/signin', user.signInUser);
router.patch('/user/:id',  getToken, verifyUserToken,userAdmin, user.changeUserToMentor);
router.get('/mentors', getToken, user.getAllMentors);
router.get('/mentor/:id', getToken, user.specificMentor);
router.post('/sessions',getToken, verifyUserToken, session.createSession);
router.patch('/sessions/:id/accept', getToken, verifyUserToken, userMentor, session.acceptMentorshipSession);
router.patch('/sessions/:id/reject', getToken, verifyUserToken, userMentor, session.rejectSession);




export default router;