import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    fk_owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false,
        default: ""
    },
    created_at:{
        type: Date,
        default: Date.now,
        required: true
    },
    finish_date: {
        type: Date,
        required: false,
        default: null
    }
})

const Mission = mongoose.model("Mission", missionSchema)

export default Mission