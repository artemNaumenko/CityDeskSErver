import {Request, Response} from "express";
const ObjectID = require("mongodb").ObjectID

export async function isCorrectUserIdInParams(req: Request, res: Response, next: Function) {
    try {
        const userId = req.params.userId
        if(ObjectID.isValid(userId)){
            return next()
        } else {
            return res.status(401).json()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}