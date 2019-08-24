import express from 'express'
import user from '../controllers/userControllers'
import { getToken,validation, verifyUserToken, getUserById, checkParamsInPut, userAdmin, userMentor, checkIfUserExist, checkIfUserNotExist} from '../middlewares/auth'
import session  from '../controllers/sessionsConrollers'
import { getSessionById } from '../middlewares/session'

const router = express.Router()

router.post('/users/auth/signup', validation, checkIfUserExist, user.signUpUser);
router.post('/users/auth/signin', checkIfUserNotExist, user.signInUser);
router.patch('/user/:id',  getToken, verifyUserToken,checkParamsInPut, userAdmin, getUserById, user.changeUserToMentor);
router.get('/mentors', getToken, user.getAllMentors);
router.get('/mentor/:id', getToken,checkParamsInPut,getUserById, user.specificMentor);
router.post('/sessions',getToken, verifyUserToken, session.createSession);
router.patch('/sessions/:id/accept', getToken, verifyUserToken, userMentor,getSessionById, session.acceptMentorshipSession);
router.patch('/sessions/:id/reject', getToken, verifyUserToken, userMentor,getSessionById, session.rejectSession);


export default router;