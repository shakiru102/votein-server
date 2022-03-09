import { Router } from "express"
import { biometrics } from "../controllers/biometricsController"
import biometricsValidation from "../middlewares/biometricsValidation"

  const router =  Router()
  router.post('/biometrics', biometrics)

  export default router