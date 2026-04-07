import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const taskRouter = Router();


taskRouter.patch('/user_id/task_id/status', authMiddleware())


export default taskRouter