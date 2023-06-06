import Select from "react-select";
import { useController, useForm } from "react-hook-form";

export function Filter({ onFilterBooks }) {
  const { control } = useForm();

  const {
    field: { value: selectValue, onChange: selectOnChange, ...restSelectField }
  } = useController({ name: "filter", control });
  const filterOptions = [
    { value: "read", label: "Read" },
    { value: "inProgress", label: "In Progress" },
    { value: "notRead", label: "Not Read" },
    { value: "thisYear", label: "Read This Year" },
    { value: "lastYear", label: "Read Last Year" },
    { value: "all", label: "All" },
  ];

  return (
    <>
      <h4>Filter By</h4>
      <Select
        autoFocus={true}
        placeholder="Filter by"
        defaultValue={{ value: true, label: "All" }}
        options={filterOptions}
        value={
          selectValue
          ? filterOptions.find((filter) => filter.value === selectValue)
          : selectValue
        }
        onChange={(option) => {
          selectOnChange(option ? option.value : option);
          onFilterBooks(option.value);
        }}
        {...restSelectField}
        />
    </>
  );
}
