import ServerError from "../helpers/serverError.helper.js"
import taskRepository from "../repository/task.repository.js"
import missionRepository from "../repository/mission.repository.js"



class TaskController {
    async create(request, response) {
        try {
            const { mission_id } = request.params
            const { description, estimated_time_minutes, difficulty } = request.body
            const mission = request.mission
            if (!mission) {
                throw new ServerError("Mision no encontrada", 404)
            }
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            if (!description || !estimated_time_minutes || !difficulty) {
                throw new ServerError("Todos los campos son requeridos", 400)
            }
            await taskRepository.create(mission_id, { description, estimated_time_minutes, difficulty })
            response.status(201).send({
                ok: true,
                status: 201,
                message: "Tarea creada exitosamente"
            })

        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }

        }
    }
    async getAllTaskOfMission(request, response) {
        try {
            const { mission_id } = request.params
            const mission = request.mission
            if (!mission) {
                throw new ServerError("Mision no encontrada", 404)
            }
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            const tasks = await taskRepository.getAllByMissionId(mission_id)
            response.status(200).send(
                {
                    ok: true,
                    status: 200,
                    message: "Tareas obtenidas exitosamente",
                    data: tasks
                }
            )
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }

        }
    }
    async getById(request, response) {
        try {
            const task = request.task
            if (!task) {
                throw new ServerError("Tarea no encontrada", 404)
            }
            const mission = await missionRepository.findById(task.fk_mission_id)
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            response.status(200).send(
                {
                    ok: true,
                    status: 200,
                    message: "Tarea obtenida exitosamente",
                    data: {
                        description: task.description,
                        estimated_time_minutes: task.estimated_time_minutes,
                        difficulty: task.difficulty,
                        status: task.status,
                        finish_date: task.finish_date,
                        created_at: task.created_at
                    }
                }
            )
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }

        }
    }
    async updateStatus(request, response) {
        try {
            const { task_id } = request.params
            const { status } = request.body
            const task = request.task
            if (!task) {
                throw new ServerError("tarea no encontrada", 404)
            }
            const mission = await missionRepository.findById(task.fk_mission_id)
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            if (!status) {
                throw new ServerError("El estado es requerido", 400)
            }
            await taskRepository.updateStatus(task_id, status)
            response.status(200).send(
                {
                    ok: true,
                    status: 200,
                    message: "Estado de la tarea actualizado exitosamente"
                }
            )
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }
        }
    }
    async update(request, response) {
        try {
            const { task_id } = request.params
            const { description, estimated_time_minutes, difficulty } = request.body
            const task = request.task
            if (!task) {
                throw new ServerError("Tarea no encontrada", 404)
            }
            const mission = await missionRepository.findById(task.fk_mission_id)
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            if (!description || !estimated_time_minutes || !difficulty) {
                throw new ServerError("Todos los campos son requeridos", 400)
            }
            await taskRepository.updateById(task_id, description, estimated_time_minutes, difficulty)
            response.status(200).send(
                {
                    ok: true,
                    status: 200,
                    message: "Tarea actualizada exitosamente"
                }
            )
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }

        }
    }
    async deleteById(request, response) {
        try {
            const { task_id } = request.params
            const task = request.task
            if (!task) {
                throw new ServerError("Tarea no encontrada", 404)
            }
            const mission = await missionRepository.findById(task.fk_mission_id)
            if (!mission.fk_owner_id.equals(request.user.id)) {
                throw new ServerError("El usuario no puede hacer esta operacion", 403)
            }
            await taskRepository.deleteById(task_id)
            response.status(200).send(
                {
                    ok: true,
                    status: 200,
                    message: "Tarea eliminada exitosamente"
                }
            )
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                console.error("Error en Mission controler", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }

        }
    }
}

const taskController = new TaskController()

export default taskController