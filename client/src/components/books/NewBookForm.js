import Button from "../common/Button/Button";
import { useState, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Input from "../common/Input/Input";
import Message from "../common/Message/Message";

export function NewBookForm() {
  const [authors, setAuthors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm();

  const {
    field: { value: selectValue, onChange: selectOnChange, ...restSelectField }
  } = useController({ name: "author", control });

  useEffect(() => {
    (async () => {
      const authorsRequest = await fetch("http://localhost:4000/authors");
      const authorsJson = await authorsRequest.json();
      setAuthors(authorsJson.authors);
    })();
  }, []);

  function getAuthorsOptions() {
    const authorsOptions = authors.reduce((acc, curr, i) => {
      acc[i] = { value: curr._id, label: curr.name };
      return acc;
    }, []);
    return authorsOptions;
  }

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

  function submitForm(data) {
    reset();

    fetch("http://localhost:4000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setIsSuccess(true);
          setSuccessMessage(result.success);
          setTimeout(() => {
            return navigate(result.redirect);
          }, 1000);
        } else if (result.error) {
          setIsError(true);
          setErrorMessage(result.error);
          setTimeout(() => {
            return navigate(0);
          }, 2000);
        }
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage(e.message);
        setTimeout(() => {
          return navigate(0);
        }, 2000);
      });
  }

  return (
    <>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <Select
          label="Author Name"
          placeholder="Select Author"
          options={getAuthorsOptions()}
          value={
            selectValue
              ? getAuthorsOptions().find(
                  (author) => author.value === selectValue
                )
              : selectValue
          }
          onChange={(option) => selectOnChange(option ? option.value : option)}
          {...restSelectField}
        />
        <Input
          validation={bookTitleValidation}
          register={register}
          errors={errors}
          onInputChange={setTitle}
        />
        <Input
          validation={bookPublisherValidation}
          register={register}
          errors={errors}
          onInputChange={setPublisher}
        />
        <Input
          validation={bookEditionValidation}
          register={register}
          errors={errors}
          onInputChange={setEdition}
        />
        <Input
          validation={bookNotesValidation}
          register={register}
          errors={errors}
          onInputChange={setNotes}
        />
        <input
          type="hidden"
          value="notRead"
          {...register("read", { required: true })}
        />
        <input
          type="hidden"
          value={false}
          {...register("inProgress", { required: true })}
        />
        {(isSuccess || isError) && (
          <Message success={successMessage} error={errorMessage} />
        )}
        <Button buttonType="submit" buttonClass="add-btn" name="Add Book" />
      </form>
    </>
  );
}
