import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";

async function connectMongoDB(){
    try {
        await mongoose.connect(ENVIROMENT.MONGO_DB_URI + "/" + ENVIROMENT.MONGO_DB_NAME);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error('error al conectarse a mongo db' + error)
    }
}

export default connectMongoDB