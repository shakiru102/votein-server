import { NextFunction, Request, Response } from "express";
import { validateElectionSchema } from "../utils/validate";

export default (req: Request, res: Response, next: NextFunction) => {
    const { error }  = validateElectionSchema(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}