import mongoose from "mongoose"
import { taskStatus,taskDifficulty } from "../constants/constants.js"

const taskSchema = new mongoose.Schema({
    fk_mission_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
    },
    description:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        enum: [taskStatus.PENDIENTE, taskStatus.EN_PROGRESO, taskStatus.COMPLETADA],
        default: taskStatus.PENDIENTE
    },
    finish_date: {
        type: Date,
        required: false,
        default: null,
    },
    estimated_time_minutes: {
        type: Number,
        required: false,
        default: 0,
    },
    difficulty: {
        type: String,
        enum: [taskDifficulty.FACIL, taskDifficulty.MEDIO, taskDifficulty.DIFICIL],
        default: taskDifficulty.FACIL,
    }
})

const Task = mongoose.model("Task", taskSchema)

export default Task