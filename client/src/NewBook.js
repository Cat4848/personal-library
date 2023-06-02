import { useEffect, useState } from "react";
import { NewForm } from "./NewForm";

export function NewBook() {
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [notes, setNotes] = useState("");

  const bookTitleValidation = {
    name: "bookTitle", 
    label: "Book Title",
    inputType: "text",
    id: "book-input",
    placeholder: "Book Title...",
    validation: {
      required: "Book Title Required"
    }
  };

  const bookPublisherValidation = {
    name: "bookPublisher", 
    label: "Book Publisher",
    inputType: "text",
    id: "book-publisher",
    placeholder: "Book Publisher...",
    validation: {
      required: "Book Publisher Required"
    }
  };

  const bookEditionValidation = {
    name: "bookEdition", 
    label: "Book Edition",
    inputType: "text",
    id: "book-edition",
    placeholder: "Book Edition...",
    validation: {
      required: "Book Edition Required"
    }
  };

  const bookNotesValidation = {
    name: "bookNotes", 
    label: "Book Notes",
    inputType: "textarea",
    id: "book-notes",
    placeholder: "Book Notes...",
    validation: {
      required: "Book Notes Required"
    }
  };
  const formType = "books";

  useEffect(() => {
    (async () => {
      const authorsRequest = await fetch("http://localhost:4000/authors");
      const authorsJson = await authorsRequest.json();
      setAuthors(authorsJson.authors);
    })()
  }, []);
  const authorsOptions = authors.reduce((acc, curr, i) => {
    acc[i] = { value: curr._id, label: curr.name }
    return acc;
  }, []);

  return (
    <>
      <h1>New Book </h1>
      <NewForm
        authorOptions={authorsOptions}
        bookTitleValidation={bookTitleValidation}
        bookPublisherValidation={bookPublisherValidation}
        bookEditionValidation={bookEditionValidation}
        bookNotesValidation={bookNotesValidation}
        onTitleChange={setTitle}
        onPublisherChange={setPublisher}
        onEditionChange={setEdition}
        onNotesChange={setNotes}
        formType={formType}
      />
    </>
  )
}