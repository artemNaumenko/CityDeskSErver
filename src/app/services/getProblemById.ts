import problemModel from "../models/problem.model";

export async function getProblemById(id: string){
    try{
        const problem = await problemModel.findOne({_id: id})
        return problem
    }catch (e) {
        return e
    }
}