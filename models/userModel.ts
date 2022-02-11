import mongoose from 'mongoose'
import { userDetails } from '../types/interface'

const schema = new mongoose.Schema<userDetails>({
     email: String,
     password: String,
     biometrics: String,
     firstname: String,
     lastname: String,
     phonenumber: String,
     voterID: String,
     electionDate: String     
})

const User = mongoose.model<userDetails>('users', schema)

export default User