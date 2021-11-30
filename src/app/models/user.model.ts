import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
        googleId: {type: String, required: true, unique: true},
        name: {type: String},
        email: {type: String, required: true, unique: true},
        photoURL: {type: String},
        statusID: {type: mongoose.Schema.Types.ObjectId, ref: "userStatus"}
    }
)

const userModel = model("user", userSchema)

export default userModel