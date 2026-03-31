import express from "express";

const missionRouter = express.Router();
import missionController from "../controllers/mission.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

missionRouter.post(
    "/:user_id",
    authMiddleware(['premium']),
    missionController.create
)

missionRouter.get(
    '/:user_id/:mission_id',
    authMiddleware(),
    missionController.getById
) 

export default missionRouter
