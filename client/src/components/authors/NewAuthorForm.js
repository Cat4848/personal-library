import { useState } from "react";
import Input from "../common/Input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Message } from "../common/Message";
import Button from "../common/Button/Button";

export function NewAuthorForm() {
  const [author, setAuthor] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const navigate = useNavigate();

  const authorValidation = {
    name: "author",
    label: "Author Name",
    inputType: "text",
    id: "author-input",
    placeholder: "Author Name...",
    validation: {
      required: "Author Name Required"
    }
  };

  function submitForm(data) {
    console.log("submit form -> data", data);
    reset();

    fetch("http://localhost:4000/authors", {
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

  function handleInputChange(authorInput) {
    setAuthor(authorInput);
  }

  return (
    <>
      <h1>Add New Author</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <Input
          validation={authorValidation}
          register={register}
          errors={errors}
          onInputChange={handleInputChange}
        />
        {(isSuccess || isError) && (
          <Message success={successMessage} error={errorMessage} />
        )}
        <Button buttonType="submit" buttonClass="add-btn" name="Add Author" />
      </form>
    </>
  );
}
