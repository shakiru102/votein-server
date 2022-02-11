import { Request, Response } from "express";
import User from "../models/userModel";
import { userDetails } from "../types/interface";
import { confirmPassword, hashPassword } from "../utils/bcrypt";
import { authUser, verifyUser } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {

    try {
    const { firstname, lastname, voterID, biometrics, email, password, phonenumber, electionDate }: userDetails = req.body 
    const newPassword = await hashPassword(password) 
    const isNewUser = await User.findOne({ biometrics }) 
    if(isNewUser) throw new Error('User already exist')
    const user = await User.create({ firstname, lastname, voterID, biometrics, email, password: newPassword, phonenumber, electionDate })
    const token = authUser({ id: user._id})
    res.cookie('votein', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).send('Signed up successfully')
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
}
export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password }: userDetails = req.body
        const verifyEmail = await User.findOne({ email })
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
        const user = await User.findById({ _id: verifiedToken.id })
        res.status(200).json(user)
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
 }
 
 export const signout = async (req: Request, res: Response) => {
     res.cookie('votein', '', {  maxAge: 1000 })
     res.status(200).send('logged out')
 }