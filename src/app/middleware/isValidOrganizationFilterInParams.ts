import {Request, Response} from "express";
import {getOrganizations} from "../services/getOrganizations";

export async function isValidOrganizationFilterInParams(req: Request, res: Response, next: Function) {
    try {
        const organizationFilter: string = req.params.ORGANIZATION
        const organizationsList: Array<any> = await getOrganizations() as Array<any>

        for(let i = 0; i < organizationsList.length; i++){
            if(organizationsList[i]._id == organizationFilter){
                return next()
            }
        }

        if(organizationFilter == "none"){
            return next()
        }

        return res.status(401).json()
    }catch (e){
        return res.status(400).json({massage: e})
    }
}