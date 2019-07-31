import express from 'express'
import { signUpUser } from '../controllers/userControllers'
import { validation } from '../middlewares/auth'


const router = express.Router()

router.post('/users/auth/signup', validation, signUpUser)



export default router;