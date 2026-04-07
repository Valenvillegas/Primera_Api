/* los middleware ressiven por parametro la request, response y next proporsionadas por express 

request => manejar consultas
response => manejar respuestas
next => es una funcion que indica que express puede pasar al siguiente controlador

No solo se limitan a hacer validaciones. Pueden servir para generar estados del servidor y transferirlos a los controladores

*/

import ServerError from "../helpers/serverError.helper.js"

function randomMiddleware(request, response, next) {
    try {
         const numero_random = Math.random()//entre 0 y 1
    if (numero_random < 0.5) {
        throw new ServerError('tienes mala suerte', 400)
    }else{
        request.suerte= true
        request.nro_random = numero_random
        next()
    }
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
                console.error("Error en random middleware", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor "
                })
            }
    }
   
}

export default randomMiddleware