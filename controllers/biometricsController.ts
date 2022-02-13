import { Request, Response } from "express"
import { io } from "../index"
import User from "../models/userModel"
import Vote from "../models/usersVoteModel"
import { userDetails } from "../types/interface"

export const biometrics = async (req: Request, res: Response) => {
    try {
        const { biometrics }: userDetails = req.body
        // Check if user has already been registered
        const registeredUser = await User.findOne({ biometrics })
        if(!registeredUser) {
            io.emit('registerbiometrics', { biometrics, register: true })
            return res.send('ok')
        } 
        io.emit('registerError', { error: 'User already exits', register: false })
        //  Check if user has voted previously
        const voted = await Vote.findOne({ userID: registeredUser._id, electionDate: registeredUser.electionDate })
        if(voted) throw new Error('You have already voted')
        
        const { firstname, lastname, voterID, phonenumber, _id, email } = registeredUser
        io.emit('vote', { firstname, lastname, voterID, phonenumber, _id, email })
        res.send('ok')
    } catch (error: any) {
        
        console.log(error.message)
        io.emit('voteError', { error: error.message })
        res.send(error.message)
    }
}