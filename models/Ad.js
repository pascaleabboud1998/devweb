const { model, Schema } = require("mongoose");

const AdSchema = new Schema({
  user: {
    required: true,
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
  },
});

module.exports = Ads = model("ads", AdSchema);
