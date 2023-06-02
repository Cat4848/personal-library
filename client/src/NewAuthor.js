import { useState } from "react";
import { NewForm } from "./NewForm";

export function NewAuthor() {
  const [author, setAuthor] = useState("");
  const authorNameValidation = {
    name: "author", 
    label: "Author Name",
    inputType: "text",
    id: "author-input",
    placeholder: "Author Name...",
    validation: {
      required: "Author Name Required"
    }
  };
  const formType = "authors";

  function handleInputChange(authorInput){
    setAuthor(authorInput);
  }

  return (
    <>
      <h1>New Author</h1>
      <NewForm
        onAuthorChange={handleInputChange}
        authorValidation={authorNameValidation}
        formType={formType}
      />
    </>
  );
}