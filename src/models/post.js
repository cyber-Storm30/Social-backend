import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 4000,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
