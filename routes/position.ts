import { Router } from "express";
import { createPosition, deletePositon, positions, updatePosition } from "../controllers/positionController";
import positionValidation from "../middlewares/positionValidation";

const router = Router()

router.post('/position/create', positionValidation , createPosition)
router.put('/position/update', positionValidation , updatePosition)
router.get('/position', positions)
router.delete('/position/delete', deletePositon)

export default router