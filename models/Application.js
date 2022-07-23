const mongoose = require("mongoose")
const { Schema } = mongoose

// * Note: This is an intermediary table between job offerings and students
const ApplicationSchema = new Schema({
  offering: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ads",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Application = mongoose.model("applications", ApplicationSchema)
