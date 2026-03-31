import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT= {
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT
}


export default ENVIROMENT