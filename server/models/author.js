const mongoose = require("mongoose");
const Book = require("./book");
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

authorSchema.pre("deleteOne", async function (next) {
  let books;
  try {
    books = await Book.find({ author: this._conditions._id });
  } catch(e) {
    if (e) next(e);
  }
  if (books.length > 0) {
    next(new Error("This Author has books associated still"));
  } else {
    next();
  }
})
module.exports = mongoose.model("Author", authorSchema);