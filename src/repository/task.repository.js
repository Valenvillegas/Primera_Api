import mongoose from "mongoose";
import Task from "../models/task.model.js";
import { taskStatus, taskDifficulty } from "../constants/constants.js";

class TaskRepository {
    async create( fk_mission_id, {title, description, difficulty, estimated_time_min }) {
        await Task.create({
            title,
            description,
            fk_mission_id,
            difficulty,
            estimated_time_min
        })
    }
    async updateById(task_id, description, difficulty, estimated_time_min) {
        const updatedTask = await Task.findByIdAndUpdate(
            task_id,
            { description, difficulty, estimated_time_min },
            {
                returnDocument: "after",
            }
        )
        return updatedTask
    }
    async updateStatus(task_id, newStatus) {
        if(!Object.values(taskStatus).includes(newStatus) === false){
             return {message: "El estado de la tarea no es valido"}
        }
        const updatedTask = await Task.findByIdAndUpdate(
            task_id,
            { status: newStatus, finish_date: new_status !== taskStatus.COMPLETADA ? null : new Date() },
            {
                returnDocument: "after",
            }
        )
        return updatedTask
    }
    async getAllByMissionId(mission_id) {
        const tasks = await Task.find({ mission_id })
        return tasks
    }
    async deleteById(task_id) {
        await Task.findByIdAndDelete(task_id)
    }
    async getDetailed(task_id) {
        const task = await Task.findById(task_id)
        return task
    }
}

const taskRepository = new TaskRepository()
export default taskRepository