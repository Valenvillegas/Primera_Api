import userRepository from "../repository/user.repository.js"
import ServerError from "../helpers/serverError.helper.js"
import missionRepository from "../repository/mission.repository.js"

class MissionController {
    async create(request, response) {
        try {
            const { user_id } = request.params
            const { title, description } = request.body

            if (!user_id) {
                throw new ServerError('El id es requerido', 400)
            }

            const user_found = await userRepository.findById(user_id)
            if (!user_found) {
                throw new ServerError('El usuario no esta registrado', 404)
            }

            const new_mission = await missionRepository.create(title, description, user_id)
            return response.status(201).send({
                ok: true,
                message: "Mision creada exitosamente",
                status: 201,
                data: new_mission
            })

        }
        catch (error) {
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
            const user = request.user
            const {mission_id} = request.params

            const mission = await missionRepository.getById(mission_id)
     
            if(!mission.fk_user_id.equals(user.id)){
                throw new ServerError('El usuario no puede hacer esta operacion', 403)
            }
            response.send(
                {
                    ok: true, 
                    status: 200,
                    message: "Mision obtenida",
                    data: {
                        mission
                    }
                }
            )
        }
        catch (error) {
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
                console.log(error)
                response.status(500).send(
                    {
                        ok: false,
                        status: 500,
                        message: "Error interno del servidor"
                    }
                )
            }
        }
    }
}

const missionController = new MissionController()
export default missionController


/* crear getbyid
 */