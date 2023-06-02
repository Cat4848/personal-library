const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  let books;
  let searchOptions = {};
  if (req.query !== null && req.query !== "") {
    searchOptions.title = new RegExp(req.query.title, "i");
  }
  try {
    books = await Book.find(searchOptions).populate("author");
  } catch (e) {
    console.log("GET all books route error -> error", e);
  }
  res.json({
    books: books
  })
});

router.post("/", async (req, res) => {
  const newBook = new Book ({
    author: req.body.author,
    title: req.body.bookTitles,
    read: req.body.read,
    inProgress: req.body.inProgress,
    publisher: req.body.bookPublisher,
    edition: req.body.bookEdition,
    notes: req.body.bookNotes
  });
  try {
    await newBook.save();
    res.json({
      success: "New Book Added Successfully",
      redirect: "/books"
    });
  } catch (e) {
    console.log("POST new book route error -> error", e);
    res.json({
      error: e.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
  } catch (e) {
    console.log("PUT Book route -> error", e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log("DELETE Book error", e);
  }
})
module.exports = router;