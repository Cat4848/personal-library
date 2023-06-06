import { useEffect, useState } from "react";
import { Author } from "./Author/Author";
import { Message } from "../common/Message";
import { SearchBar } from "../common/SearchBar";

export function Authors() {
  const [authors, setAuthors] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let url = "http://localhost:4000/authors/";

  if (searchInput !== "") {
    url = url + `?author=${searchInput}`;
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAuthors(data.authors))
      .catch((e) => <Message error={e.message} />);
  }, [url]);

  useEffect(() => {
    if (isError) {
      const timeoutId = setTimeout(() => setIsError(false), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isError]);

  function handleUpdate(updatedAuthor) {
    setAuthors(
      authors.map((author) => {
        if (author._id === updatedAuthor._id) {
          return updatedAuthor;
        } else {
          return author;
        }
      })
    );
  }

  function handleDelete(authorId) {
    fetch(url + `/${authorId}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((message) => {
        if (message.error) {
          setIsError(true);
          setErrorMessage(message.error);
        } else {
          setAuthors(authors.filter((author) => author._id !== authorId));
        }
      });
  }

  return (
    <>
      <h1>Authors</h1>
      <SearchBar
        name={"Authors"}
        input={searchInput}
        onInputChange={setSearchInput}
      />

      {isError && <Message error={errorMessage} />}

      {authors.map((author) => (
        <Author
          key={author._id}
          author={author}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
