import bcrypt from "bcrypt";
import User from "../models/user.js";

export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSalt(15);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const newUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted succesfully !!!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...newUser } = user._doc;
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const follow = async (req, res) => {
  if (req.params.id != req.body.userId) {
    try {
      //currentUser will follow user
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
};

export const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.body._id } });
    res.status(202).json({ data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
