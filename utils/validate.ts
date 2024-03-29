import joi from 'joi'
import { candidateDetails, positionDetail, userDetails, usersVote } from '../types/interface'

const signupUserSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    biometrics: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phonenumber: joi.string().required(),
    voterID: joi.string().required(),
})

const signinSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(8)
    
})

const candidateSchema = joi.object<candidateDetails>({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    party: joi.string().required(),
    position: joi.string().required(),
    electionDate: joi.string().required(),
    NIN: joi.string().required(),
    _id: joi.any()
})

const positionSchema = joi.object<positionDetail>({
    position: joi.string().required(),
    maxVote: joi.string().required(),
    _id: joi.any()
})



const userVoteSchema = joi.object<usersVote>({
    userID: joi.string().required(),
    electionDate: joi.string().required(),
    votes: joi.array().items(joi.object<positionDetail>({
        position: joi.string().required(),
        maxVote: joi.number().required(),
        vote: joi.alternatives().try(joi.string() , joi.array().items(joi.string())).required(),

    })).required()
})
const electionSchema = joi.object({
    electionDate: joi.string().required(),
    date: joi.string().required(),
    time: joi.string().required(),
    admin: joi.string().required()
})

export const validateSignupSchema = (user: userDetails) => signupUserSchema.validate(user)

export const validateSigninSchema = (user: userDetails) => signinSchema.validate(user)

export const validateCandidateSchema = ( data: candidateDetails) => candidateSchema.validate(data)

export const valiadatePositionSchema = (data: positionDetail) => positionSchema.validate(data)

export const validateUserVoteSchema = (data: usersVote) => userVoteSchema.validate(data)

export const validateElectionSchema = (data: object) =>  electionSchema.validate(data)