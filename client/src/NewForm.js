import { useController, useForm } from "react-hook-form";
import { Input } from "./Input";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "./Message";
import { AddButton } from "./AddButton";

export function NewForm({
  authorOptions,
  authorValidation,
  bookTitleValidation,
  bookPublisherValidation,
  bookEditionValidation,
  bookNotesValidation,
  onAuthorChange,
  onTitleChange,
  onPublisherChange,
  onEditionChange,
  onNotesChange,
  formType
}) {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  function submitForm(data) {
    console.log("submit form function -> data", data);
    reset();

    fetch(`http://localhost:4000/${formType}`, {
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
      .catch((e) => console.log("Error Adding New Author -> error", e));
  }

  function formContent(type) {
    switch (type) {
      case "authors": {
        return (
          <form onSubmit={handleSubmit(submitForm)}>
            <Input
              validation={authorValidation}
              register={register}
              errors={errors}
              onChange={onAuthorChange}
            />
            {(isSuccess || isError) && (
              <Message success={successMessage} error={errorMessage} />
            )}
            <AddButton name={type} />
          </form>
        );
      }
      case "books": {
        return (
          <form onSubmit={handleSubmit(submitForm)}>
            <Select
              label="Author Name"
              placeholder="Select Author"
              options={authorOptions}
              value={
                selectValue
                  ? authorOptions.find((author) => author.value === selectValue)
                  : selectValue
              }
              onChange={(option) =>
                selectOnChange(option ? option.value : option)
              }
              {...restSelectField}
            />
            <Input
              validation={bookTitleValidation}
              register={register}
              errors={errors}
              onChange={onTitleChange}
            />
            <Input
              validation={bookPublisherValidation}
              register={register}
              errors={errors}
              onChange={onPublisherChange}
            />
            <Input
              validation={bookEditionValidation}
              register={register}
              errors={errors}
              onChange={onEditionChange}
            />
            <Input
              validation={bookNotesValidation}
              register={register}
              errors={errors}
              onChange={onNotesChange}
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
            <AddButton name={type} />
          </form>
        );
      }
      default:
        throw Error("Unknown Form Type");
    }
  }

  return <>{formContent(formType)}</>;
}
