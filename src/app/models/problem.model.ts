import mongoose, {Schema, model} from "mongoose";

const problemSchema = new Schema({
        title: {type: String, required: true},
        context: {type: String},
        authorID: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
        photoURL: {type: String, required: true},
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true},
        responsibleOrganizations: [{type: mongoose.Schema.Types.ObjectId, ref: "organization"}],
        statusID: {type: mongoose.Schema.Types.ObjectId, ref: "problemStatus"}
    }, {
        timestamps: true
    }
)

const problemModel = model("problem", problemSchema)

export default problemModel