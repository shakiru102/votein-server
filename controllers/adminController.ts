import { Request, Response } from "express";
import { io } from "../index";
import Admin from "../models/adminModel";
import Electiontitle from "../models/electionDateModel";
import { adminDetails } from "../types/interface";
import { confirmPassword } from "../utils/bcrypt";
import { authUser, verifyUser } from "../utils/jwt";

export const signin = async (req: Request, res: Response) => {
       try {
           const { email, password }: adminDetails = req.body
           const verifyEmail = await Admin.findOne({ email })
           if(!verifyEmail) throw new Error('Invalid Email')
           const verifyPassword = await confirmPassword(password, verifyEmail.password)
           if(!verifyPassword) throw new Error('Invalid Password')
           const token = authUser({id: verifyEmail._id})
           res.status(200).json({ token })
       } catch (error: any) {
           console.log(error.message)
           res.status(400).send(error.message)
       }
}

export const auth = async (req: Request, res: Response) => {
   try {
       const token = req.header('Votein')
       if(!token) throw new Error('Unauthorized')
       const verifiedToken = verifyUser(token)
       if(!verifiedToken) throw new Error('Unauthroized')
    //    @ts-ignore
       const admin = await Admin.findById({ _id: verifiedToken.id })
       if(admin) {
        const { _id, email, electionDate } = admin
       res.status(200).json({ _id, email, electionDate })

       }
   } catch (error: any) {
       console.log(error.message)
       res.status(400).send(error.message)
   }
}


export const election = async (req: Request, res: Response) => {
    try {
     await Electiontitle.create(req.body)
        io.emit('electiontitle', req.body)
        res.status(200).send('ok')
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}