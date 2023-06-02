import { Input } from "./Input";

export function SearchForm({
  searchType,
  onSearch,
  onChange,
  register,
  errors,
  handleSubmit
}) {

  const authorSearchValidation = {
    name: "author",
    label: "Search Authors",
    inputType: "text",
    id: "author-input",
    placeholder: "Author Name...",
    validation: {
      required: "Author Name Required"
    }
  };

  const bookSearchValidation = {
    name: "bookTitle",
    label: "Search Books",
    inputType: "text",
    id: "book-input",
    placeholder: "Book Title...",
    validation: {
      required: "Book Name Required"
    }
  };

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <Input
        validation={
          searchType === "authors"
            ? authorSearchValidation
            : bookSearchValidation
        }
        register={register}
        errors={errors}
        onChange={onChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
