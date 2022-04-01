import { Request, Response } from "express"
import { io } from "../index"
import User from "../models/userModel"
import Vote from "../models/usersVoteModel"
import { authUser } from '../utils/jwt'
import { userDetails } from "../types/interface"
import FingerprintID from "../models/biometricsID"

export const biometrics = async (req: Request, res: Response) => {
    try {
        const { biometrics }  = req.body
        // io.emit('testing', biometrics)
        // Check if user has already been registered
        const registeredUser = await User.findOne({ biometrics })
        if(!registeredUser) {
            io.emit('registerbiometrics', { biometrics, register: true })
            io.emit('voteError', { error: 'User is not Registered' })
            return res.send('ok')
        } 
        io.emit('registerError', { error: 'User already exits', register: false })
        //  Check if user has voted previously
        const voted = await Vote.findOne({ userID: registeredUser._id, electionDate: registeredUser.electionDate })
        if(voted) {
            io.emit('voteError', { error: `${ registeredUser.lastname } ${ registeredUser.firstname } you have already voted` })
            return res.send('ok')
        }
        
        const { _id } = registeredUser
        const token = authUser({ id: _id })
        io.emit('vote', { token })
        res.send(biometrics)
    } catch (error: any) {
        // io.emit('testing', biometrics)  
        res.status(200).send(biometrics)
    }
}
export const initiateEnroll = async (req: Request, res: Response) => {
   try {
     const id = Object.keys(req.body)
    if(id[0] == 'id') {
        console.log(req.body)
        await FingerprintID.create({ templateID: req.body.id })
        return res.status(200).send('fingerprint saved')
    }

    const confirm_id = Object.keys(req.body)
    if(confirm_id[0] == 'confirm_id'){
        console.log(req.body)
      return  res.status(200).send('Fingerprint has been added!')
    }

    const fingerprint = await FingerprintID.find({})
    if(fingerprint.length) {
        await FingerprintID.deleteMany({})
        console.log(fingerprint[0].templateID)
      return res.status(200).send(`add-id${fingerprint[0].templateID}`)

    }

    console.log(req.body)
    res.status(200).send('nothing')
    





   } catch (error: any) {
       res.status(400).send(error.message)
   }
}
export const verifyEnrolledFingerPrint = async (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).send('verified')
}