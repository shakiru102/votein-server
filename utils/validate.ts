import joi, { required } from 'joi'
import { candidate, candidateDetails, positionDetail, userDetails, usersVote } from '../types/interface'

const signupUserSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    biometrics: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phonenumber: joi.string().required(),
    voterID: joi.string().required(),
    electionDate: joi.string().required()
})

const signinSchema = joi.object<userDetails>({
    email: joi.string().required().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    
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
    maxVote: joi.string().required()
})

const votesSchema = joi.object<candidate>({
    candidateID: joi.string().required(),
    party: joi.string().required(),
    position: joi.string().required()
}) 

const userVoteSchema = joi.object<usersVote>({
    userID: joi.string().required(),
    electionDate: joi.string().required(),
    votes: [ votesSchema ]
})

export const validateSignupSchema = (user: userDetails) => signupUserSchema.validate(user)

export const validateSigninSchema = (user: userDetails) => signinSchema.validate(user)

export const validateCandidateSchema = ( data: candidateDetails) => candidateSchema.validate(data)

export const valiadatePositionSchema = (data: positionDetail) => positionSchema.validate(data)

export const validateUserVoteSchema = (data: usersVote) => userVoteSchema.validate(data)