import mongoose from "mongoose";
import Task from "../models/task.model.js";
import { taskStatus, taskDifficulty } from "../constants/constants.js";
import ServerError from "../helpers/serverError.helper.js";
/* 
POST /api/tasks/:user_id/:mission_id: Crear una tarea dentro de una misión.
GET /api/tasks/:user_id/:mission_id: Listar todas las tareas de una misión particular.
GET /api/tasks/:user_id/detail/:task_id: Obtener el detalle de una única tarea.
PUT /api/tasks/:user_id/:task_id: Editar descripción, dificultad o tiempo de una tarea.
DELETE /api/tasks/:user_id/:task_id: Eliminar una tarea individual. */

class TaskRepository {
    async create(fk_mission_id, { description, difficulty, estimated_time_minutes }) {
        await Task.create({
            description,
            fk_mission_id,
            difficulty,
            estimated_time_minutes
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
        const task = await Task.findById(task_id)
        if (!task) {
            throw new ServerError("Tarea no encontrada", 404)
        }
        if (!Object.values(taskStatus).includes(newStatus)) {
            throw new ServerError("El estado de la tarea no es valido", 400)
        }
        const updatedTask = await Task.findByIdAndUpdate(
            task_id,
            { status: newStatus, finish_date: newStatus === taskStatus.COMPLETADA ? Date.now() : null },
            {
                returnDocument: "after",
            }
        )
        return updatedTask
    }
    async getAllByMissionId(mission_id) {
        const tasks = await Task.find({ fk_mission_id: mission_id })
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