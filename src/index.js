import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import { Server } from "socket.io";

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
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//database
mongoose.connect(process.env.MONGO_URL, options).then(() => {
  console.log("Database connected");
});

//server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Connected on port ${process.env.PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
});
