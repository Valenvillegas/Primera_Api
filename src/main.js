import ENVIROMENT from "./config/enviroment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import productRepository from "./repository/product.repository.js";
import userRepository from "./repository/user.repository.js";
await connectMongoDB()
