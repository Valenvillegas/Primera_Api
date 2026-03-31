import connectMongoDB from "./config/mongoDB.config.js";
import express, { response } from "express";
import ENVIROMENT from "./config/enviroment.config.js";
import statusRouter from "./routes/status.router.js";
import authRouter from "./routes/auth.router.js";
import missionRouter from "./routes/mission.router.js";
await connectMongoDB()

const app = express()

/* 
es un middleware global que se antepone a todos y revisa si el body de la request esta en tipo json y en caso de serlo lo transforma en un objeto JS
*/
app.use(express.json())

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/missions', missionRouter)

app.listen(ENVIROMENT.PORT, () => 
    console.log(`Servidor escuchando en el puerto ${ENVIROMENT.PORT}!`))

/* desarrollar una api para gestionar las misiones y tareas

/api/auth/login
    body:{
    gmail, password
    } 

Get /api/mission/:user_id

get /api/missions/:user_id/:mission_id

Put /api/missions/:user_id/:mission_id

delete /api/missions/:user_id/:mission_id

si sabemos que validar ususario se va repetir varias veces conviene plantearlas con middleware

El middleware es como un controlador, pero se antepone al controlador final

Ej:
    validateUserMiddleware => extraer dinero
    validateUserMiddleware => depositar dinero

ValidateUserMiddleware es uno que se configurara a nivel de ruta o endpoint, no es global ya que no todos necesitan validar si el usuario existe, ej login, logout
*/