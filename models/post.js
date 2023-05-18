import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    required: true,
  },
  description: mongoose.Schema.Types.Mixed,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("post", postSchema);
