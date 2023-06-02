import { useEffect, useState } from "react";
import { Author } from "./Author";
import { SearchForm } from "./SearchForm";
import { useForm } from "react-hook-form";
import { Message } from "./Message";

export function Authors() {
  const [authors, setAuthors] = useState([]);
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, formState: {errors}, handleSubmit } = useForm();
  let url = "http://localhost:4000/authors/";

  if (input !== "") {
    url = url + `?author=${input}`;
  }

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setAuthors(data.authors))
      .catch(e => console.log("test fetch 3 -> error", e))
  }, [url]);

  useEffect(() => {
    if (isError) {
      const timeoutId = setTimeout(() => setIsError(false), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isError])

  function onSearch(data) {
    console.log("handle submit click ->  data", data);
  }
  
  function onChange(input){
    setInput(input);
  }
  
  function handleEditAuthors(nextAuthor) {
    setAuthors(authors.map(author => {
      if (author._id === nextAuthor._id) {
        return nextAuthor;
      } else {
        return author;
      }
    }));
  }

  function handleDeleteAuthor(id) {
    console.log("handle delete authors");
    fetch(url + `/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(message => {
        if (message.error) {
          setIsError(true);
          setErrorMessage(message.error);
        } else {
          setAuthors(authors.filter(author => author._id !== id));
        }
      });
  }

  return (
    <>
      <h1>Authors</h1>
      <SearchForm
        searchType={"authors"}
        onSearch={onSearch}
        onChange={onChange}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      {isError && <Message error={errorMessage} />}
      
      {authors.map((author) => (
        <Author
          key={author._id}
          author={author}
          onUpdate={handleEditAuthors}
          onDelete={handleDeleteAuthor}
        />
      ))}
    </>
  );
}