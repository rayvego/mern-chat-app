// environmental files setup
import dotenv from "dotenv";
dotenv.config();

// setting up the server
import express from "express";
const app = express();

import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

// routes
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

// database connection
import connectToMongoDB from "./db/connnectToMongoDB.js";

// basic middleware setup
app.use(cookieParser());

// for parsing json content
app.use(express.json());

// routers
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening on port ${PORT}...`);
});