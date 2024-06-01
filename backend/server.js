import dotenv from "dotenv";
dotenv.config()

import express from 'express';
const app = express();

import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToMongoDB from "./db/connnectToMongoDB.js";

app.use(cookieParser());

app.use(express.json())
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);



app.get("/", (req, res) => {
    res.send("Hello from Express")
})

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Listening on port ${PORT}...`)
})