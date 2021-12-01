import mongoose, {Schema, model} from "mongoose";

const organizationSchema = new Schema({
        name: {type: String, required: true, unique: true},
        email: {type: String, required: true}
    }
)

const organizationModel = model("organization", organizationSchema)

export default organizationModel