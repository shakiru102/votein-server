import { Router } from "express"
import { biometrics, initiateEnroll } from "../controllers/biometricsController"
import biometricsValidation from "../middlewares/biometricsValidation"

  const router =  Router()
  router.post('/biometrics', biometrics)
  router.post('/biometrics/initiateEnroll', initiateEnroll)

  export default router