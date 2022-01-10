import express from "express";
import Post from "../models/post.js";

const router = express.Router();

export const createPost = async (req, res) => {
  const newPost = Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ data: savedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Post deleted succesfully!!!" });
    } else {
      res.status(403).json({ message: "You can only delete your own posts" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(403).json({ message: "You can only update your own posts" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  const userId = req.query.userId;
  try {
    let posts;
    if (userId) {
      posts = await Post.find({ userId: userId });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeorDislikePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked !!!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked !!!");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.updateOne({ $push: { comments: req.body } });
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default router;
