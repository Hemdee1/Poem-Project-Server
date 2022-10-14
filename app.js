import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, () => {
  app.listen(process.env.PORT, () => {
    console.log("app is listening on port:" + process.env.PORT);
  });
});

// using middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

app.use("/post", postRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
