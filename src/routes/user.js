import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";
import { verifyUser } from "../helpers/index.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);

export default router;
