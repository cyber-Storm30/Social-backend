import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(expressValidator());

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

//database
mongoose.connect("mongodb+srv://ranajit:ranajit@cluster0.5hxlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", options).then(() => {
  console.log("Database connected");
});

//server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Connected on port ${process.env.PORT}`);
});
