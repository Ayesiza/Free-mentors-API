import express from 'express'
import user from '../controllers/userControllers'
import auth from '../middlewares/auth'
import session  from '../controllers/sessionsConrollers'
import review from '../middlewares/session'

const router = express.Router()

router.post('/users/auth/signup', auth.validation, auth.checkIfUserExist, user.signUpUser);
router.post('/users/auth/signin', auth.checkIfUserNotExist, user.signInUser);
router.patch('/user/:id',  auth.getToken, auth.verifyUserToken,auth.checkParamsInPut, auth.userAdmin, auth.getUserById, user.changeUserToMentor);
router.get('/mentors', auth.getToken,auth.verifyUserToken, auth.noMentorViewToMentor, user.getAllMentors);
router.get('/mentor/:id', auth.getToken, auth.verifyUserToken,auth.checkParamsInPut, auth.noMentorViewToMentor,auth.getUserById, user.specificMentor);
router.post('/sessions',auth.getToken, auth.verifyUserToken , auth.noMentorToCreateSession, review.sessionAlreadyExist,review.checkIfMentor,review.ifMentorExists, session.createSession);
router.patch('/sessions/:id/accept', auth.getToken, auth.verifyUserToken, auth.userMentor, review.getSessionById,auth.sessionOwner, auth.checkStatus, session.acceptMentorshipSession);
router.patch('/sessions/:id/reject', auth.getToken, auth.verifyUserToken, auth.userMentor,review.getSessionById, auth.sessionOwner,auth.checkStatus,session.rejectSession);
router.post('/sessions/:id/review',auth.getToken, auth.verifyUserToken, review.getSessionById,review.notReviewYourSelf, review.notReviewAgain,review.shdReviewYourOwn, session.reviewSession )

export default router;