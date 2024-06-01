import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
    profilePicture: {
        type: String,
        default: ""
    }
    // createdAt and updatedAt fields will be automatically created ("Member since ...")
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User