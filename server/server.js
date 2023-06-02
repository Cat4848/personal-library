const express = require("express");
const app = express();
if (app.get("env") === "development") {
  require("dotenv").config();
}
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.log("db error", error));
db.once("open", () => console.log("Connected to Mongoose."));

//routes
const indexRoute = require("./routes/index");
const authorsRoute = require("./routes/authors");
const booksRoute = require("./routes/books");
app.use("/", indexRoute);
app.use("/authors", authorsRoute);
app.use("/books", booksRoute);

app.listen(4000, () => console.log("Server listening on port 4000."));

