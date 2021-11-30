import {Schema, model} from "mongoose";

const problemStatusSchema = new Schema({
        value: {type: String, required: true, unique: true, default: "UNSOLVED"}
    }
)

const problemStatusModel = model("problemStatus", problemStatusSchema)

export default problemStatusModel