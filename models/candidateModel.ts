import mongoose from 'mongoose';
import { candidateDetails } from '../types/interface';

const schema = new mongoose.Schema<candidateDetails>({

    electionDate: String,
    firstname: String,
    lastname: String,
    party: String,
    position: String,
    
})

const Candidate = mongoose.model<candidateDetails>('candidates', schema)

export default Candidate