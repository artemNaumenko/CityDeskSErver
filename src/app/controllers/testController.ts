import  {Request, Response} from "express";


export async function testController(req: Request, res: Response): Promise<Response>{
    return res.status(200).json("Server is available")
}
