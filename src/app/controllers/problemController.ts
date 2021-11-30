import  {Request, Response} from "express";
import {addingProblem} from "../services/addingProblem";
import {getAllUnsolvedProblems} from "../services/getAllUnsolvedProblems";
import {getAllSolvedProblems} from "../services/getAllSolvedProblems";
import {deleteProblem} from "../services/deleteProblem";

export async function addingProblemController(req: Request, res: Response): Promise<Response>{
    try{
        const title: string = req.body.title
        const context : string = req.body.context
        const authorId: string = req.body.userId
        const longitude: number = req.body.longitude
        const latitude: number = req.body.latitude
        const photoURL: string = req.body.photoBin

        await addingProblem(title, context,authorId, photoURL, longitude, latitude)

        return res.status(200).json("Successful")
    } catch (e){
        return res.status(400).json({Error: e})
    }
}

export async function getAllUnsolvedProblemsController(req: Request, res: Response): Promise<Response>{
    try{
        const unsolvedProblems = await getAllUnsolvedProblems()
        return res.status(200).json(unsolvedProblems)
    }catch (e) {
        return res.status(400).json({Error: e})
    }
}

export async function getAllSolvedProblemsController(req: Request, res: Response): Promise<Response>{
    try{
        const solvedProblems = await getAllSolvedProblems()
        return res.status(200).json(solvedProblems)
    }catch (e) {
        return res.status(400).json({Error: e})
    }
}

export async function deleteProblemController(req: Request, res: Response): Promise<Response>{
    try{
        const problemId: string = req.body.problemId
        await deleteProblem(problemId)
        return res.status(200).json({message: "Success"})
    } catch(e){
        return res.status(400).json({Error: e})
    }
}