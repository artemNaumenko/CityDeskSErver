import problemModel from "../models/problem.model";
import problemStatusModel from "../models/problemStatus.model";

export async function getAllSolvedProblems(){
    try {
        const solved = await problemStatusModel.findOne({value: "SOLVED"})
        const solvedProblems = problemModel.find({statusID: solved._id})
        return solvedProblems
    } catch (e){
        return e
    }
}