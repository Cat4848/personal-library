export function Input({
  validation: {
    name, label, id, placeholder, inputType, validation
  }, register, errors, onInputChange
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          {...register(name, validation)}
          onChange={e => onInputChange(e.target.value)}
          />
      </label>
      <p>{errors[name]?.message}</p>
    </div>
  );
}
