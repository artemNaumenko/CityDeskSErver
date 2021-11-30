import {Request, Response} from "express";
const ObjectID = require("mongodb").ObjectID

export async function isValidProblemData(req: Request, res: Response, next: Function) {
    try {
        const title: string = req.body.title
        const context : string = req.body.context
        const authorId: string = req.body.authorId
        const longitude: number = parseFloat(req.body.longitude)
        const latitude: number = parseFloat(req.body.latitude)
        const photoURL: string = req.body.photoURL

        console.log(latitude)
        if(ObjectID.isValid(authorId) && title && context && longitude && latitude && photoURL &&
                (typeof longitude == "number") && (typeof latitude == "number")){
            return next()
        } else {
            return res.status(401).json()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}