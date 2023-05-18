import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  description: mongoose.Schema.Types.Mixed,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  timestamps: true,
});

export default mongoose.model("post", postSchema);
