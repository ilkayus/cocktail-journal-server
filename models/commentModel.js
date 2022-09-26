const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    maxLength: 140,
    minlength: 1,
  },
  cocktailId: {
    type: mongoose.Schema.ObjectId,
    ref: "Cocktail",
    required: true,
  },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  username: { type: String },
  userPhoto: { type: String },
  createDate: { type: Date, default: new Date() },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
