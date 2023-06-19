export default function Input({
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
      <h6 data-testid="h6">{ errors[name]?.message}</h6>
    </div>
  );
}
