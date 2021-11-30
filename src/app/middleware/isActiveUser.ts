import {Request, Response} from "express";
import userModel from "../models/user.model";
import userStatusModel from "../models/userStatus.model";

export async function isActiveUser(req: Request, res: Response, next: Function) {
    try {
        const userId = req.body.authorId
        const user =  await userModel.findOne({_id: userId})
        if(user) {
            const statusId = user.statusID
            const status = await userStatusModel.findOne({_id: statusId})
            if(status.value != "BANNED") {
                return next()
            }
            return res.status(400).json({massage: "You are banned"})
        }
        return res.status(400).json({massage: "User is not find"})
    }catch (e){
        return res.status(400).json({massage: e})
    }
}