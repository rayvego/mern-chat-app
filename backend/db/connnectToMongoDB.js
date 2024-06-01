import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("Mongo Connection Successful ✅")
        })
        .catch((err) => {
            console.log("Mongo Connection Failed ❌")
            console.log(err)
        })
}

export default connectToMongoDB