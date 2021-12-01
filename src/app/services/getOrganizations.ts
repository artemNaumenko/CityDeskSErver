import organizationModel from "../models/organization.model";

export async function getOrganizations(){
    try{
        const organizations = await organizationModel.find()
        return organizations
    }catch (e) {
        return e
    }
}