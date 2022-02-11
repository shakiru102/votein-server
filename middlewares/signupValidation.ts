import { NextFunction, Request, Response } from "express";
import { validateSignupSchema } from "../utils/validate";

export default ( req: Request, res: Response, next: NextFunction) => {
        const { error } = validateSignupSchema(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        next()
}