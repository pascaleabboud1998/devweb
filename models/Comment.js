const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  from: {
    ref: "users",
    type: Schema.Types.ObjectId,
    required: true,
  },
  to: {
    ref: "users",
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = Comment = model("comments", commentSchema);
