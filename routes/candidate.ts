import { Router } from "express";
import { createCandidate, deleteCandidate, updateCandidate } from "../controllers/candidateController";
import candidateValidation from "../middlewares/candidateValidation";

const router = Router()

router.post('/candidate/create', candidateValidation , createCandidate)
router.put('/candidate/update', candidateValidation , updateCandidate)
router.delete('/candidate/delete', deleteCandidate)

export default router

