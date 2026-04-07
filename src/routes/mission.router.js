import express from "express";

import missionController from "../controllers/mission.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import missionMiddleware from "../middlewares/mission.middleware.js";

const missionRouter = express.Router();

missionRouter.post(
    "/:user_id",
    authMiddleware([]),
    missionController.create
)

missionRouter.get(
    "/search/:user_id",
    authMiddleware([]),
    missionController.getAll
)

missionRouter.delete(
    "/:user_id/:mission_id",
    authMiddleware([]),
    missionMiddleware(),
    missionController.deleteById
)

export default missionRouter
