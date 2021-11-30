import  {Request, Response} from "express";
import {findUser, registerUser} from "../services/userLogginServices";
import {deleteUser} from "../services/deleteUser";


export async function signInController(req: Request, res: Response): Promise<Response>{
    try{
        const userId: string = req.body.id
        const userName: string = req.body.name
        const userPhotoURL: string = req.body.photoURL
        const userEmail: string = req.body.email

        const existingUser = await findUser(userId)

        if(!existingUser){
            const newUser = await registerUser(userId, userName, userEmail, userPhotoURL)
            return res.status(200).json({id: newUser._id})
        } else {
            return res.status(200).json({id: existingUser._id})
        }

    }catch (e) {
        return res.status(400).json({Error: e})
    }
}

export async function deleteUserController(req: Request, res: Response): Promise<Response>{
    try{
        const userId: string = req.body.userId
        await deleteUser(userId)
        return res.status(200).json({message: "Success"})
    } catch(e){
        return res.status(400).json({Error: e})
    }
}