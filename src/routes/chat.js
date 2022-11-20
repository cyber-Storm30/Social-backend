import express from "express";
import { accessChat, fetchChats } from "../controllers/chat.js";

const router = express.Router();

router.post("/accessChat", accessChat);
router.get("/", fetchChats);

export default router;
