import mongoose from 'mongoose'
import { candidate, usersVote } from '../types/interface'

const candidateSchema = new mongoose.Schema<candidate>({
    position: String,
    party: String,
    candidateID: String
})

const schema = new mongoose.Schema<usersVote>({
    userID: String,
    votes: [ candidateSchema ],
    electionDate: String
})

const Vote = mongoose.model<usersVote>('votes', schema)

export default Vote

