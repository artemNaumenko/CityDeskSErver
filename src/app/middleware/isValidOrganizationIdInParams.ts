import {Request, Response} from "express";
const ObjectID = require("mongodb").ObjectID

export async function isValidOrganizationIdInParams(req: Request, res: Response, next: Function) {
    try {
        const organizationId = req.params.organizationId
        if(ObjectID.isValid(organizationId)){
            return next()
        } else {
            return res.status(401).json()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}