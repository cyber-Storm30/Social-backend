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
      res.status(200).json({ newUser: newUser });
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
