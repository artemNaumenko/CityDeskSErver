import {Request, Response} from "express";
import {getOrganizations} from "../services/getOrganizations";

export async function getOrganizationController(req: Request, res: Response): Promise<Response>{
    try{
        const organizations = await getOrganizations()
        return res.status(200).json(organizations)
    }catch (e) {
        return res.status(400).json({Error: e})
    }
}