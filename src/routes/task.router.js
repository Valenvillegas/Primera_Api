import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import missionMiddleware from "../middlewares/mission.middleware.js"
import taskMiddleware from "../middlewares/task.middleware.js"
import taskController from "../controllers/task.controller.js"



const taskRouter = express.Router()

taskRouter.post(
    '/:user_id/:mission_id',
    authMiddleware([]),
    missionMiddleware,
    taskController.create
)

taskRouter.get(
    '/:user_id/:mission_id',
    authMiddleware([]),
    missionMiddleware,
    taskController.getAllTaskOfMission
)

taskRouter.get(
    '/:user_id/detail/:task_id',
    authMiddleware([]),
    taskMiddleware,
    taskController.getById
)

taskRouter.put(
    '/:user_id/:task_id',
    authMiddleware([]),
    taskMiddleware,
    taskController.update
)

taskRouter.patch(
    '/:user_id/:task_id/status',
    authMiddleware([]),
    taskMiddleware,
    taskController.updateStatus
)
taskRouter.delete(
    '/:user_id/:task_id',
    authMiddleware([]),
    taskMiddleware,
    taskController.deleteById
)


export default taskRouter