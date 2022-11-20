import express from "express";
import {
  deleteUser,
  follow,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyUser } from "../helpers/index.js";

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUser);
router.put("/:id/followUnfollow", follow);

// router.put("/:id/unfollow", unfollow);

export default router;
