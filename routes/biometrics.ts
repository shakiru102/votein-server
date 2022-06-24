import { Router } from "express"
import { initiateEnroll } from "../controllers/biometricsController"

  const router =  Router()
  // router.post('/biometrics', biometrics)
  router.post('/biometrics/initiateEnroll', initiateEnroll)
  // router.post('/biometrics/verifyErolledFingerPrint', verifyEnrolledFingerPrint)

  export default router