import { Router } from "express";
import { auth, signin, signout } from "../controllers/adminController";
import signinValidation from "../middlewares/signinValidation";

const router = Router()

router.post('/admin/signin', signinValidation , signin)
router.get('/admin/auth', auth)
router.get('/admin/signout', signout)

export default router