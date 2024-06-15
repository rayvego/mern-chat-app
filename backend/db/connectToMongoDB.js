import mongoose from "mongoose";

// typical mongodb connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Mongo Connection Successful ✅");
  } catch (err) {
    console.log("Mongo Connection Failed ❌");
    console.log(err);
  }
};

export default connectToMongoDB;