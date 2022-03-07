import { Request, Response } from "express";
import { io } from "../index";
import User from "../models/userModel";
import Vote from "../models/usersVoteModel";

export const addVote = async (req: Request, res: Response) => {
       try {
          const saved = await Vote.create(req.body)
           const votes = await Vote.find({ electionDate: saved.electionDate })
           io.emit('allvotes', votes)
           const user = await User.findById({ _id: saved.userID })
           res.status(200).send(`${ user?.lastname } ${ user?.firstname } your vote has been saved successfully`)
       } catch (error: any) {
           res.status(400).send(error.message)
       }
}

export const vote = async (req: Request, res: Response) => {
       try {
           const votes = await Vote.find({ electionDate: req.query.electionDate })
           res.status(200).json(votes)
       } catch (error: any) {
           res.status(400).send(error.message)
           
       }
}