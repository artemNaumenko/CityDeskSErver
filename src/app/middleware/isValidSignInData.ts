import {Request, Response} from "express";
const ObjectID = require("mongodb").ObjectID

export async function isValidSignInData(req: Request, res: Response, next: Function) {
    try {
        const userId: string = req.body.id
        const userEmail: string = req.body.email

        if(userId && userEmail){
            return next()
        } else {
            return res.status(401).json()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}