import { Router } from "express"
import { biometrics } from "../controllers/biometricsController"

  const router =  Router()
  router.post('/biometrics', biometrics)

  export default router