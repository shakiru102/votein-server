import { Router } from "express";
import { auth, election, getUser, signin } from "../controllers/adminController";
import signinValidation from "../middlewares/signinValidation";

const router = Router()

router.post('/admin/signin', signinValidation , signin)
router.get('/admin/auth', auth)
router.post('/admin/electiontitle', election)
router.get('/admin/users', getUser)

export default router