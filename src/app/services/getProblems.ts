import problemModel from "../models/problem.model";
import problemStatusModel from "../models/problemStatus.model";

export async function getProblems(solvedFilter: string, organizationFilter: string){
    try{
        if(solvedFilter == "true"){
            const solvedFilterId = await problemStatusModel.findOne({value: "SOLVED"})

            if(organizationFilter == "none"){
                const problems = await problemModel.find({statusID: solvedFilterId})
                return problems
            } else {
                const problems = await problemModel.find({statusID: solvedFilterId,
                                                                responsibleOrganizations: organizationFilter})
                return problems
            }
        } else if(solvedFilter == "false"){
            const solvedFilterId = await problemStatusModel.findOne({value: "UNSOLVED"})

            if(organizationFilter == "none"){
                const problems = await problemModel.find({statusID: solvedFilterId})
                return problems
            } else {
                const problems = await problemModel.find({statusID: solvedFilterId,
                    responsibleOrganizations: organizationFilter})
                return problems
            }

        } else {// "none"
            if(organizationFilter == "none"){
                const problems = await problemModel.find()
                return problems
            } else {
                const problems = await problemModel.find({responsibleOrganizations: organizationFilter})
                return problems
            }

        }
    }catch (e) {
        return e
    }
}