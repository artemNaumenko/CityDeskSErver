import {Request, Response} from "express";

export async function isValidSolvedFilterInParams(req: Request, res: Response, next: Function) {
    try {
        const solvedFilter: string = req.params.SOLVED
        if(solvedFilter != "true" && solvedFilter != "false" && solvedFilter != "none"){
            return res.status(401).json()
        } else {
            return next()
        }
    }catch (e){
        return res.status(400).json({massage: e})
    }
}