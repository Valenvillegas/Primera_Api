import ServerError from "../helpers/serverError.helper.js"
import taskRepository from "../repository/task.repository.js"

function taskMiddleware() {
    return async function (request, response, next) {
        try {
            const { task_id } = request.params
            if (!task_id) {
                throw new ServerError("no se proporsiono el id de la tarea", 400)
            }
            const task = await taskRepository.getDetailed(task_id)
            if (!task) {
                throw new ServerError("la tarea no existe", 404)
            }
            request.task = task
            next()
        } catch (error) {
            if (error instanceof ServerError) {
                response.status(error.status).send({
                    ok: false,
                    status: error.status,
                    message: error.message
                })
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

export default taskMiddleware