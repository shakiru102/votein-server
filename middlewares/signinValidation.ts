import { NextFunction, Request, Response } from "express";
import { validateSigninSchema } from "../utils/validate";

export default (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateSigninSchema(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}