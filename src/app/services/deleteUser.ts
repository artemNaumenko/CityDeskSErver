import userStatusModel from "../models/userStatus.model";
import userModel from "../models/user.model";

export async function deleteUser(userId: string){
    try {
        const banned = await userStatusModel.findOne({value: "BANNED"})
        await userModel.updateOne({_id: userId}, {statusID: banned._id})
    } catch (e){
        return e
    }
}