import ServerError from "../helpers/serverError.helper.js"
import missionRepository from "../repository/mission.repository.js"


async function missionMiddleware(request, response, next) {
    try {
        const { mission_id } = request.params
        if (!mission_id) {
            throw new ServerError("no se proporsiono el id de la mision", 400)
        }
        const mission = await missionRepository.findById(mission_id)
        if (!mission) {
            throw new ServerError("la mision no existe", 404)
        }
        request.mission = mission
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


export default missionMiddleware