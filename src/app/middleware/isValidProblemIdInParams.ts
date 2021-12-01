import {Request, Response} from "express";
const ObjectID = require("mongodb").ObjectID

export async function isValidProblemIdInParams(req: Request, res: Response, next: Function) {
    try {
        const problemId = req.params.problemId
        if(ObjectID.isValid(problemId)){
            return next()
        } else {
            return res.status(401).json()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}