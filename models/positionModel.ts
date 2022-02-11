import mongoose from 'mongoose';
import { positionDetail } from '../types/interface';

const schema = new mongoose.Schema<positionDetail>({
    position: String,
    maxVote: Number
})

const Position = mongoose.model<positionDetail>('positions', schema)

export default Position