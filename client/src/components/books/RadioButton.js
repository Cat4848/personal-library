export function RadioButton({ label, value, onChange }) {
  const checkedClassName = `btn ${label.toLowerCase()}-btn checked-btn`;
  const unCheckedClassName = `btn ${label.toLowerCase()}-btn`;
  return (
    <label className={value ? checkedClassName : unCheckedClassName}>
      <input
        type="radio"
        checked={value}
        onChange={onChange}
        className="book-radio-input"
      />
      {label}
    </label>
  )
}