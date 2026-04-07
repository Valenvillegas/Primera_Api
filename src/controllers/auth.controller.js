import ServerError from "../helpers/serverError.helper.js"
import userRepository from "../repository/user.repository.js"

class AuthController {
    async login(request, response) {
        try {
            const { email, password } = request.body
            if (!email || !password) {
                throw new ServerError('Email y contraseña son obligatorios', 400)
            }
            const user_found = await userRepository.findByEmail(email)
            if (!user_found) {
                throw new ServerError('Usuario no encontrado', 404)
            }
            if (user_found.password !== password) {
                throw new ServerError('Contraseña incorrecta', 401)
            }
            response.status(200).send({
                ok: true,
                message: "Login exitoso",
                status: 200,
                data: {
                    id: user_found._id,
                    email: user_found.email,
                    password: user_found.password
                }
            }
            )

        } catch (error) {

            /* si el error es esperado respondo con los datos de ese error */
            if (error instanceof ServerError) {
                response.status(error.status).send(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            //si el error es inesperado(Excepciones)
            else {
                console.error("error en auth controller", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }
        }
    }
    async register(request, response) {
        try {
            const { email, password } = request.body
            if (!email || !password) {
                throw new ServerError('Email y contraseña son obligatorios', 400)
            }
            const user_found = await userRepository.findByEmail(email)
            if (user_found) {
                throw new ServerError('Usuario ya registrado', 409)
            }
            const new_user = await userRepository.create(email, password)
            response.status(201).send({
                ok: true,
                message: "Usuario registrado exitosamente",
                status: 201,
                data: {
                    id: new_user._id,
                    email: new_user.email,
                    password: new_user.password
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
                console.error("error en auth controller", error)
                response.status(500).send({
                    ok: false,
                    status: 500,
                    message: "Error del servidor"
                })
            }
        }
    }
}

const authController = new AuthController()
export default authController