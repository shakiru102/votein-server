import { Router } from "express";
import { addVote } from "../controllers/voteController";
import votesValidation from "../middlewares/votesValidation";

const router = Router()

router.post('/votes/addvote', votesValidation, addVote)

export default router