import { useEffect, useState } from "react";
import { Book } from "./Book";
import { SearchForm } from "./SearchForm";
import { useForm } from "react-hook-form";
import { Filter } from "./Filter";

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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  let url = "http://localhost:4000/books/";
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    (async () => {
      const authorsRequest = await fetch("http://localhost:4000/authors/");
      const authorsJson = await authorsRequest.json();
      setAuthors(authorsJson.authors);
    })();
  }, []);

  if (search !== "") {
    url = url + `?title=${search}`;
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
  
  function onSearch(data) {
    console.log("handle submit -> data", data);
  }

  function updateDatabase(changedBook) {
    fetch(`http://localhost:4000/books/${changedBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(changedBook)
    });
  }

  function onChange(changedBook) {
    console.log("onChange book -> changed book", changedBook);
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

  function handleDeleteBook(bookId) {
    console.log("onDelete function -> book id", bookId);
    setBooks(books.filter((book) => book._id !== bookId));

    fetch(`http://localhost:4000/books/${bookId}`, { method: "DELETE" });
  }

  function handleFilterBooks(filterType) {
    console.log("handle filter books -> type", filterType);
    setFilter(filterType);
  }

  return (
    <>
      <h1>Books</h1>
      <SearchForm
        searchType={"books"}
        onSearch={onSearch}
        onChange={setSearch}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      <Filter onFilter={handleFilterBooks} />
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
              onChange={onChange}
              onDelete={handleDeleteBook}
              authorsOptions={authorsOptions}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
