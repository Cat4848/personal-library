const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  let authors;
  let searchOptions = {};
  if (req.query !== null && req.query !== "") {
    searchOptions.name = new RegExp(req.query.author, "i");
  }
  try {
    authors = await Author.find(searchOptions);
  } catch (e) {
  }
  res.json({
    authors: authors
  });
});

router.post("/", async (req, res) => {
  const newAuthor = new Author({
    name: req.body.author
  });
  try {
    await newAuthor.save();
    res.json({
      success: "New Author added successfully",
      redirect: "/authors"
    });
  } catch (e) {
    console.log("post author error", e.message);
    res.json({
      error: e.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const replaced = await Author.replaceOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
  } catch (e) {
    console.log("Error updating Author -> error", e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Author.deleteOne({ _id: req.params.id });
    res.json({
      success: "Author deleted"
    });
  } catch (e) {
    console.log("DELETE Author -> error", e.message);
    res.json({
      error: e.message
    });
  }
});
module.exports = router;