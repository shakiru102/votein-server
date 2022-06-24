import { Router } from "express";
import { auth, getElectionDate, signin, signup } from "../controllers/userController";
import signinValidation from "../middlewares/signinValidation";
import signupValidation from "../middlewares/signupValidation";

const router = Router()
 router.post('/user/signup', signupValidation , signup)
 router.post('/user/signin', signinValidation , signin)
 router.get('/user/auth', auth)
 router.get('/currentElectionTitle', getElectionDate)

export default router