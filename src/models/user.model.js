import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        telephone:{
            type: String,
            required:true,
            unique:true
        },
        role:{
            default: 'free',
            enum: ['premium','free'],
            type: String
        }
    }
)

const User = mongoose.model("User", userSchema)

export default User