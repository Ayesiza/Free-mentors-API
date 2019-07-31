import express from 'express'
import { signUpUser, signInUser } from '../controllers/userControllers'
import { validation } from '../middlewares/auth'


const router = express.Router()

router.post('/users/auth/signup', validation, signUpUser)
router.post('/users/auth/signin', signInUser)



export default router;