import mongoose from 'mongoose'
import { adminDetails } from '../types/interface'

const schema = new mongoose.Schema<adminDetails>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    electionDate: {
        type: String,
    },
    admin: {
        type: Boolean,
    },
    super: {
        type: Boolean
    }
})

const Admin = mongoose.model<adminDetails>('admin', schema)

export default  Admin