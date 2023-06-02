import Select from "react-select";
import { useController, useForm } from "react-hook-form";

export function Filter({ onFilter }) {
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
      <label>Filter By</label>
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
          onFilter(option.value);
        }}
        {...restSelectField}
        />
    </>
  );
}
