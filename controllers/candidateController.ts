import { Request, Response } from "express";
import Candidate from "../models/candidateModel";
import { candidateDetails } from "../types/interface";

export const createCandidate = async (req: Request, res: Response) => {
    try {
        const { NIN }: candidateDetails = req.body
        const isNewCandidate = await Candidate.findOne({ NIN })
        if(isNewCandidate) throw new Error('Candidate already exist')
        await Candidate.create(req.body)
        const candidates = await Candidate.find({})
        res.status(200).json(candidates)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const updateCandidate = async (req: Request, res: Response) => {
    try {
        const { _id, firstname, lastname, party, position, NIN, electionDate, }: candidateDetails = req.body
        await Candidate.updateOne({ _id }, { firstname, lastname, party, position, NIN, electionDate })
        const candidates = await Candidate.find({})
        res.status(200).json(candidates)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}

export const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const _id = req.query.id
        await Candidate.deleteOne({ _id })
        const candidates = await Candidate.find({})
        res.status(200).json(candidates)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
export const candidates = async (req: Request, res: Response) => {
   try {
       const candidates = await Candidate.find({ electionDate: req.query.electionDate })
       res.status(200).json(candidates)
   } catch (error: any) {
        res.status(400).send(error.message)
   }
}