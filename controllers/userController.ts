import { Request, Response } from "express";
import Electiontitle from "../models/electionDateModel";
import User from "../models/userModel";
import { userDetails } from "../types/interface";
import { confirmPassword, hashPassword } from "../utils/bcrypt";
import { authUser, verifyUser } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {

    try {
    const { firstname, lastname, voterID, biometrics, email, password, phonenumber}: userDetails = req.body 
    const newPassword = await hashPassword(password) 
    const isNewUser = await User.findOne({ biometrics }) 
    if(isNewUser) throw new Error('User already exist')
    const electiontitle: object[] = await Electiontitle.find({}).sort({ electionDate: 1 })
    const user = await User.create({ firstname, lastname, voterID, biometrics, email, password: newPassword, phonenumber, electionDate: electiontitle[0] })
    const token = authUser({ id: user._id})
    res.status(200).json({ token })
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
        const user = await User.findById({ _id: verifiedToken.id })
        if(user){
        const { firstname, lastname, email, phonenumber, voterID, electionDate, _id }  = user
        res.status(200).json({ firstname, lastname, email, phonenumber, voterID, electionDate, _id})
        }
        
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
 }
 
