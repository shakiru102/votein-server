import { Request, Response } from "express";
import Admin from "../models/adminModel";
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
           res.cookie('votein',token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
           res.send('Loggedin')
       } catch (error: any) {
           console.log(error.message)
           res.status(400).send(error.message)
       }
}

export const auth = async (req: Request, res: Response) => {
   try {
       const token = await req.cookies.votein
       if(!token) throw new Error('Unauthorized')
       const verifiedToken = verifyUser(token)
       if(!verifiedToken) throw new Error('Unauthroized')
    //    @ts-ignore
       const admin = await Admin.findById({ _id: verifiedToken.id })
       res.status(200).json(admin)
   } catch (error: any) {
       console.log(error.message)
       res.status(400).send(error.message)
   }
}

export const signout = async (req: Request, res: Response) => {
    res.cookie('votein', '', {  maxAge: 1000 })
    res.status(200).send('logged out')
}