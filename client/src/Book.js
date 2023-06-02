import { useState } from "react";
import Select from "react-select";
import { useController, useForm } from "react-hook-form";
import { RadioButton } from "./RadioButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SaveButton } from "./SaveButton";
import { updateUtility } from "./updateUtility";

export function Book({ index, book, onChange, onDelete, authorsOptions }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isStarted, setIsStarted] = useState(book.startReading ? true : false);
  const [isStopped, setIsStopped] = useState(book.stopReading ? true : false);

  const authorsOptionsSelect = authorsOptions.slice();
  const booksUrl = "http://localhost:4000/books/";
  return isEditing ? (
    <Editing
      index={index}
      book={book}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      onChange={onChange}
      onDelete={onDelete}
      authorsOptionsSelect={authorsOptionsSelect}
    />
  ) : (
    <NotEditing
      index={index}
      booksUrl={booksUrl}
      book={book}
      onDelete={onDelete}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      onChange={onChange}
      isStarted={isStarted}
      setIsStarted={setIsStarted}
      isStopped={isStopped}
      setIsStopped={setIsStopped}
    />
  );
}

function NotEditing({
  index,
  book,
  onDelete,
  isEditing,
  setIsEditing,
  onChange,
  isStarted,
  setIsStarted,
  setIsStopped
}) {
  return (
    <tr className="book-row">
      <td>{index}</td>
      <td>
        <input
          type="checkbox"
          checked={book.read === "read" ? true : false}
          onChange={() =>
            onChange({
              ...book,
              read: book.read === "read" ? "notRead" : "read"
            })
          }
        />
      </td>
      <td>
        <input type="checkbox" checked={book.inProgress} readOnly={true} />
      </td>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.publisher}</td>
      <td>{book.edition}</td>
      <td>{book.notes}</td>
      <td>
        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </td>
      <td>
        <DeleteButton onDelete={onDelete} id={book._id} />
      </td>
      <td>
        <RadioButton
          label="Start"
          value={isStarted && book.inProgress ? true : false}
          onChange={() => {
            setIsStarted(true);
            setIsStopped(false);
            onChange({
              ...book,
              inProgress: true,
              startReading: new Date().toISOString()
            });
          }}
        />
      </td>
      <td>
        <RadioButton
          label="Stop"
          value={book.inProgress ? false : true}
          onChange={() => {
            setIsStopped(true);
            setIsStarted(false);
            onChange({
              ...book,
              inProgress: false,
              read: "read",
              stopReading: new Date().toISOString()
            });
          }}
        />
      </td>
    </tr>
  );
}

function Editing({
  index,
  book,
  booksUrl,
  isEditing,
  setIsEditing,
  onChange,
  onDelete,
  authorsOptionsSelect
}) {
  const { control } = useForm();
  const {
    field: { value: selectValue, onChange: selectOnChange, ...restSelectField }
  } = useController({ name: "author", control });

  return (
    <tr className="book-row">
      <td>{index}</td>
      <td>
        <input
          type="checkbox"
          checked={book.read === "read" ? true : false}
          onChange={() =>
            onChange({
              ...book,
              read: book.read === "read" ? "notRead" : "read"
            })
          }
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={book.inProgress}
          readOnly={true}
        />
      </td>
      <td>
        <input
          value={book.title}
          onChange={(e) => {
            onChange({
              ...book,
              title: e.target.value
            });
          }}
        />
      </td>
      <td>
        <Select
          label="Author Name"
          placeholder="Select Author"
          defaultValue={{ value: book.author._id, label: book.author.name }}
          options={authorsOptionsSelect}
          value={
            selectValue
              ? authorsOptionsSelect.find(
                  (author) => author.value === selectValue
                )
              : selectValue
          }
          onChange={(option) => {
            selectOnChange(option ? option.value : option);
            onChange({
              ...book,
              author: { _id: option.value, name: option.label }
            });
          }}
          {...restSelectField}
        />
      </td>
      <td>
        <input
          value={book.publisher}
          onChange={(e) => {
            onChange({
              ...book,
              publisher: e.target.value
            });
          }}
        />
      </td>
      <td>
        <input
          value={book.edition}
          onChange={(e) => {
            onChange({
              ...book,
              edition: e.target.value
            });
          }}
        />
      </td>
      <td>
        <input
          value={book.notes}
          onChange={(e) => {
            onChange({
              ...book,
              notes: e.target.value
            });
          }}
        />
      </td>
      <td>
        <SaveButton
          updateStateAndDatabase={() => updateUtility({
            url: booksUrl,
            item: book,
            isEditing: isEditing,
            setIsEditing: setIsEditing
          })}
        />
      </td>
      <td>
        <DeleteButton onDelete={onDelete} id={book._id} />
      </td>
    </tr>
  );
}
