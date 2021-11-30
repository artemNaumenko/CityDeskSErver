import userModel from "../models/user.model";
import userStatusModel from "../models/userStatus.model";

export async function findUser (userId: string): Promise<any>{
    try {
        const user = await userModel.findOne({googleId: userId})

        if(user){
            return user
        } else {
            return false
        }

    } catch (e){
        return e
    }
}

export async function registerUser(userId: string, userName: string, userEmail: string, userPhotoURL: string){
    try {
        const status = await userStatusModel.findOne({value: "ACTIVE"})

        const user = new userModel({
            googleId: userId,
            name: userName,
            email: userEmail,
            photoURL: userPhotoURL,
            statusID: status._id
        })
        await user.save()

        return user
    } catch (e) {
        return e
    }
}