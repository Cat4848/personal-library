import { useEffect, useState } from "react";
import { Book } from "./Book";
import { Filter } from "./Filter";
import SearchBar from "../common/SearchBar/SearchBar";

const filterMap = {
  all: () => true,
  read: (book) => book.read === "read",
  inProgress: (book) => book.inProgress,
  thisYear: (book) =>
    new Date(book.stopReading).getFullYear() === new Date().getFullYear(),
  lastYear: (book) => {
    const currentBookYear = new Date(book.stopReading).getFullYear();
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    return currentBookYear === lastYear.getFullYear();
  },
  notRead: (book) => book.read === "notRead"
};

export function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("all");
  let url = "http://localhost:4000/books/";

  useEffect(() => {
    (async () => {
      const authorsRequest = await fetch("http://localhost:4000/authors/");
      const authorsJson = await authorsRequest.json();
      setAuthors(authorsJson.authors);
    })();
  }, []);

  if (searchInput !== "") {
    url = url + `?title=${searchInput}`;
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((books) => setBooks(books.books));
  }, [url]);

  const authorsOptions = authors.reduce((acc, curr, i) => {
    acc[i] = { value: curr._id, label: curr.name };
    return acc;
  }, []);

  function updateDatabase(changedBook) {
    fetch(`http://localhost:4000/books/${changedBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(changedBook)
    });
  }

  function handleChange(changedBook) {
    setBooks(
      books.map((book) => {
        if (book._id === changedBook._id) {
          updateDatabase(changedBook);
          return changedBook;
        } else {
          return book;
        }
      })
    );
  }

  function handleDelete(bookId) {
    setBooks(books.filter((book) => book._id !== bookId));

    fetch(`http://localhost:4000/books/${bookId}`, { method: "DELETE" });
  }

  function handleFilterBooks(filterType) {
    setFilter(filterType);
  }

  return (
    <>
      <h1>Books</h1>
      <SearchBar
        name={"Books"}
        input={searchInput}
        onInputChange={setSearchInput}
      />
      <Filter onFilterBooks={handleFilterBooks} />
      <table>
        <colgroup span={12}></colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>Read</th>
            <th>Reading in Progress</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Edition</th>
            <th>Notes</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Start Reading</th>
            <th>Stop Reading</th>
          </tr>
        </thead>
        <tbody>
          {books.filter(filterMap[filter]).map((book, i) => (
            <Book
              key={book._id}
              index={i + 1}
              book={book}
              onChange={handleChange}
              onDelete={handleDelete}
              authorsOptions={authorsOptions}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
