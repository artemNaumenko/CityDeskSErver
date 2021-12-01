import problemModel from "../models/problem.model";
import problemStatusModel from "../models/problemStatus.model";

export async function addingProblem(title: string, context : string, authorId: string, photoURL: string,
                                    longitude: number, latitude: number, address: string, responsibleOrganizations: any){
    try{
        const status = await problemStatusModel.findOne({value: "UNSOLVED"})

        const problem = new problemModel({
            title: title,
            context : context,
            authorID: authorId,
            photoURL: photoURL,
            longitude: longitude,
            latitude: latitude,
            address: address,
            statusID: status._id,
            responsibleOrganizations: responsibleOrganizations
        })

        await problem.save()
        return problem._id
    } catch (e){
        return e
    }
}