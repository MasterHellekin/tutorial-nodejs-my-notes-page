const mongoose = require("mongoose");
const { Schema } = mongoose;

const Note = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model("Note", Note);
