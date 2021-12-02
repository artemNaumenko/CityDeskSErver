import  {Request, Response} from "express";
import {addingProblem} from "../services/addingProblem";
import {getAllUnsolvedProblems} from "../services/getAllUnsolvedProblems";
import {getAllSolvedProblems} from "../services/getAllSolvedProblems";
import {deleteProblem} from "../services/deleteProblem";
import {emailService} from "../services/emailReportServices";
import {getProblemById} from "../services/getProblemById";
import {getProblems} from "../services/getProblems";
import problemModel from "../models/problem.model";
const axios = require('axios')

export async function addingProblemController(req: Request, res: Response): Promise<Response>{
    try{
        const title: string = req.body.title
        const context : string = req.body.context
        const authorId: string = req.body.authorId
        const longitude: number = req.body.longitude
        const latitude: number = req.body.latitude
        const photoURL: string = req.body.photoURL

        const responsibleOrganizations = req.body.responsibleOrganizations

        const URL = `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.geocodingApiKey}&lat=${latitude}&lon=${longitude}&format=json`
        const response = await axios.get(URL)

        const road = response.data.address.road
        const city = response.data.address.city


        const address: string = `${road}, ${city}`

        const problemId = await addingProblem(title, context,authorId, photoURL, longitude, latitude, address, responsibleOrganizations)
        await emailService(problemId)

        return res.status(200).json()
    } catch (e){
        return res.status(400).json({Error: e})
    }
}

export async function getProblemsController(req: Request, res: Response){
    try{
        const solvedFilter = req.params.SOLVED
        const organizationFilter = req.params.ORGANIZATION

        await problemModel.deleteOne({_id: "61a8986b111a3022ed7425d8"})

        const problems = await getProblems(solvedFilter, organizationFilter)
        return res.status(200).json(problems)
    } catch (e) {
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

export async function getProblemByIdController(req: Request, res: Response): Promise<Response>{
    try{
        const problemId: string = req.params.problemId
        const problem = await getProblemById(problemId)

        return res.status(200).json(problem)
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