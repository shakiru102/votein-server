import { Router } from "express";
import { addVote, vote } from "../controllers/voteController";
import votesValidation from "../middlewares/votesValidation";

const router = Router()

router.post('/votes/addvote', votesValidation, addVote)
router.get('/votes', vote)
export default router