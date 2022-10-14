import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: [String],
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    read: {
      type: [String],
      default: [],
    },
    user_id: {
      type: String,
      required: true,
    },
    user_penName: {
      type: String,
      default: "unknown",
    },
    user_image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("poem", Schema);

export default postModel;
