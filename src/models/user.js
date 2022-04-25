import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 3,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    coverpic: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [{}],
      default: [],
    },
    followings: {
      type: [{}],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
