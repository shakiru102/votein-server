import { Request, Response } from "express";
import Vote from "../models/usersVoteModel";

export const addVote = async (req: Request, res: Response) => {
       try {
           await Vote.create(req.body)
           res.status(200).send('Vote has been saved successfully')
       } catch (error: any) {
           res.status(400).send(error.message)
       }
}