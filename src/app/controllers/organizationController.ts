import {Request, Response} from "express";
import {getOrganizations} from "../services/getOrganizations";
import {getOrganizationById} from "../services/getOrganizationById";

export async function getOrganizationController(req: Request, res: Response): Promise<Response>{
    try{
        const organizations = await getOrganizations()
        return res.status(200).json(organizations)
    }catch (e) {
        return res.status(400).json({Error: e})
    }
}

export async function getOrganizationByIdController(req: Request, res: Response): Promise<Response>{
    try{
        const organizationId: string = req.params.organizationId
        const organization = await getOrganizationById(organizationId)
        return res.status(200).json(organization)
    }catch (e) {
        return res.status(400).json({Error: e})
    }
}
