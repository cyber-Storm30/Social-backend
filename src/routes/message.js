import express from "express";
import { allMessages, sendMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/", sendMessage);
router.post("/:chatId", allMessages);

export default router;
