import problemModel from "../models/problem.model";
import problemStatusModel from "../models/problemStatus.model";

export async function deleteProblem(problemId: string){
    try {
        const solved = await problemStatusModel.findOne({value: "SOLVED"})
        await problemModel.updateOne({_id: problemId}, {statusID: solved._id})
    } catch (e){
        return e
    }
}