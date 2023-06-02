const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  },
  title: {
    type: String,
    required: true
  },
  read: {
    type: String,
    required: true
  },
  inProgress: {
    type: Boolean,
    required: true
  },
  startReading: Date,
  stopReading: Date,
  publisher: String,
  edition: String,
  notes: String,
});
module.exports = mongoose.model("Book", bookSchema);
