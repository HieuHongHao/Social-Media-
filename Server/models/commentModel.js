const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    post: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    author: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    content: {
      type: String,
      require: [true, "A comment must have a content"],
      maxlength: 1000
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

commentSchema.pre(/^find/,function(next){
    this.populate("author");
    next();
})
const commentModel = mongoose.model("Comment",commentSchema);
module.exports = commentModel;