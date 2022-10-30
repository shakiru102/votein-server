import { Request, Response } from "express";
import { io } from "../index";
import Admin from "../models/adminModel";
import Electiontitle from "../models/electionDateModel";
import User from "../models/userModel";
import { adminDetails, userDetails } from "../types/interface";
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
        const token = req.header('VOTEIN')
       if(!token) throw new Error('Unauthorized')
       const verifiedToken = verifyUser(token)
       if(!verifiedToken) throw new Error('Unauthroized')
    //    @ts-ignore
       const admins = await Admin.findById({ _id: verifiedToken.id })
       if(!admins) throw new Error('Unauthorized') 
        const { _id, email, electionDate, admin } = admins
       res.status(200).json({ _id, email, electionDate, admin, super: admins.super ? true : false })

   } catch (error: any) {
       console.log(error.message)
       res.status(400).send(error.message)
   }
}


export const election = async (req: Request, res: Response) => {
    try {
     const election = await Electiontitle.create(req.body)
     await  Admin.updateMany({ electionDate: election.electionDate })
     await  User.updateMany({ electionDate: election.electionDate })
        res.status(200).send('ok')
    } catch (error: any) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, {_id: 1})
        res.status(200).json(users)
    } catch (error: any) {
        res.send(error.message)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, {_id: 1, firstname: 1, lastname: 1, phonenumber: 1, voterID: 1 })
        res.status(200).json(users)
    } catch (error: any) {
        res.send(error.message)
    }
}