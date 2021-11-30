import problemModel from "../models/problem.model";
import problemStatusModel from "../models/problemStatus.model";

export async function getAllUnsolvedProblems(){
    try {
        const unsolved = await problemStatusModel.findOne({value: "UNSOLVED"})
        const unsolvedProblems = problemModel.find({statusID: unsolved._id})
        return unsolvedProblems
    } catch (e){
        return e
    }
}