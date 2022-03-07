import mongoose from 'mongoose'
import { usersVote } from '../types/interface'



const schema = new mongoose.Schema<usersVote>({
    userID: String,
    votes: mongoose.Schema.Types.Mixed,
    electionDate: String
})

const Vote = mongoose.model<usersVote>('votes', schema)

export default Vote

