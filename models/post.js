const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: { type: String },
  firstName: { type: String },
  content: { type: String },
});

const postSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  userId: { type: String },
  firstName: { type: String },
  title: { type: String },
  content: { type: String },
  comments: [commentSchema],
  upVotes: [{ type: String }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
