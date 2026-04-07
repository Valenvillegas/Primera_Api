/* quiero que mi middleware valide si el user_id pasado por request.paramas es un user_id valido que corresponda a algun usuario de la aplicacion
en caso de existir debera guardar en la request la informacion del usuario(sesion)
 */
/* 
version 1


import ServerError from "../helpers/serverError.helper.<FaJsfiddle />"
import userRepository from "../repository/user.repository"
async function authMiddleware(request,response, next){
    try {
        const{user_id}= request.params
        if(!user_id){
            throw new ServerError('no ha proporcionado el id del usuario', 400)
        }
        const user = await userRepository.findById(user_id)
        if(!user){
            throw new ServerError('el usuario no existe', 404)
        }
        request.user= user
        next()
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
export default authMiddleware */



import ServerError from "../helpers/serverError.helper.js"
import userRepository from "../repository/user.repository.js"

/* verifica id de usuario, que exista y que cumpla el rol que se pida 

se pasara al middleware la lista de roles validos y el mismo validara y en caso de no enviar lista o enviarlo vacia dejara que cualquier usuario logueado haga la operacion

la tecnica es que tu middleware retorne un middleware
 
*/

/* export function middleware(params){
    return function(request,response, next){
        console.log(params)
        next()
    }
}
middleware('pepe') */
// retorna una referencia

function authMiddleware(valid_roles = []) {
    return async function (request, response, next) {
        try {
            const { user_id } = request.params
            if (!user_id) {
                throw new ServerError('no ha proporcionado el id del usuario', 400)
            }
            const user = await userRepository.findById(user_id)
            if (!user) {
                throw new ServerError('el usuario no existe', 404)
            }
            if (valid_roles.length > 0 && (!user.role || !valid_roles.includes(user.role))) {
                throw new ServerError("no tiene permiso para la operacion", 403)
            }

            request.user = user
            next()
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
export default authMiddleware