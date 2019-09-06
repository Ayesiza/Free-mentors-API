import express from 'express'
import user from '../controllers/userControllers'
import auth from '../middlewares/auth'
import session  from '../controllers/sessionsConrollers'
import { getSessionById,questionExist,notReviewOwn,notReviewAgain,shdReviewYourOwn } from '../middlewares/session'

const router = express.Router()

router.post('/users/auth/signup', auth.validation, auth.checkIfUserExist, user.signUpUser);
router.post('/users/auth/signin', auth.checkIfUserNotExist, user.signInUser);
router.patch('/user/:id',  auth.getToken, auth.verifyUserToken,auth.checkParamsInPut, auth.userAdmin, auth.getUserById, user.changeUserToMentor);
router.get('/mentors', auth.getToken, user.getAllMentors);
router.get('/mentor/:id', auth.getToken, auth.checkParamsInPut,auth.getUserById, user.specificMentor);
router.post('/sessions',auth.getToken, auth.verifyUserToken,questionExist, session.createSession);
router.patch('/sessions/:id/accept', auth.getToken, auth.verifyUserToken, auth.userMentor, getSessionById,auth.sessOwner, session.acceptMentorshipSession);
router.patch('/sessions/:id/reject', auth.getToken, auth.verifyUserToken, auth.userMentor,getSessionById, session.rejectSession);
router.post('/sessions/:id/review',auth.getToken, auth.verifyUserToken, getSessionById,notReviewOwn,notReviewAgain,shdReviewYourOwn, session.reviewSession )

export default router;