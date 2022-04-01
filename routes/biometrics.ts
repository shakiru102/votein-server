import { Router } from "express"
import { biometrics, initiateEnroll, verifyEnrolledFingerPrint } from "../controllers/biometricsController"
import biometricsValidation from "../middlewares/biometricsValidation"

  const router =  Router()
  router.post('/biometrics', biometrics)
  router.post('/biometrics/initiateEnroll', initiateEnroll)
  router.post('/biometrics/verifyErolledFingerPrint', verifyEnrolledFingerPrint)

  export default router