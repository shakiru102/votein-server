import { Request, Response } from "express";
import Position from "../models/positionModel";
import { positionDetail } from "../types/interface";

export const createPosition = async (req: Request, res: Response) => {
      try {
          const { position, maxVote }: positionDetail = req.body
          await Position.create({ position, maxVote })
          const positions = await Position.find({})
          res.status(200).json(positions) 
      } catch (error: any) {
          res.status(400).send(error.message)
      }  
}

export const updatePosition = async (req: Request, res: Response) => {
    try {
        const { position, maxVote, _id }: positionDetail = req.body
        await Position.updateOne({ _id }, { position, maxVote })
        const positions = await Position.find({})
        res.status(200).json(positions) 
    } catch (error: any) {
        res.status(400).send(error.message)
    }
    
}

export const deletePositon = async (req: Request, res: Response) => {
    try {
        const _id = req.query.id
        await Position.deleteOne({ _id })
        const positions = await Position.find({})
        res.status(200).json(positions) 
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}