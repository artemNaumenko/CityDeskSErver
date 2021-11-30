import {Schema, model} from "mongoose";

const userStatusSchema = new Schema({
        value: {type: String, required: true, unique: true, default: "ACTIVE"}
    }
)

const userStatusModel = model("userStatus", userStatusSchema)

export default userStatusModel