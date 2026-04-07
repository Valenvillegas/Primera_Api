import express from "express";
import statusController from "../controllers/status.controller.js";
import randomMiddleware from "../middlewares/randomMiddleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const statusRouter = express.Router();

/* 
primero pasa por el random middleware donde se determina mi suerte

si tengo suerte pasara al metodo -get del statusController
*/
statusRouter.get('/:user_id', authMiddleware([]), statusController.get)


export default statusRouter

