import { Router } from "express";
import { auth, election, getUser, getUsers, signin } from "../controllers/adminController";
import electionValidation from "../middlewares/electionValidation";
import signinValidation from "../middlewares/signinValidation";

const router = Router()

router.post('/admin/signin', signinValidation , signin)
router.get('/admin/auth', auth)
router.post('/admin/electiontitle', electionValidation , election)
router.get('/admin/users', getUser)
router.get('/admin/voters', getUsers)

export default router