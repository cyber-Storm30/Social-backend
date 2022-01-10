import express from "express";
import {
  commentPost,
  createPost,
  deletePost,
  getPosts,
  likeorDislikePosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

//get all posts
router.get("/", getPosts);
//create post
router.post("/createpost", createPost);
//delete post
router.delete("/:id", deletePost);
//update post
router.put("/:id", updatePost);
//like or dislike a post
router.put("/:id/like", likeorDislikePosts);
//comment
router.put("/:id/comment", commentPost);

export default router;
