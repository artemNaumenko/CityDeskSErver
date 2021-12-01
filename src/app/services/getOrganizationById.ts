import organizationModel from "../models/organization.model";

export async function getOrganizationById(id: string){
    try{
        const organization = await organizationModel.findOne({_id: id})
        return organization
    }catch (e) {
        return e
    }
}