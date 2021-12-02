import {Request, Response} from "express";

export async function isValidApiKey(req: Request, res: Response, next: Function) {
    try {
        const key = req.headers.apiaccsesskey
        if (key == process.env.apiAccessKey as string){
            return next()
        } else {
            return res.status(405).json({ERROR: "API access key is not correct"})
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}