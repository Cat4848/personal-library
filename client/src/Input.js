export function Input({
  validation: {
    name, label, id, placeholder, inputType, validation
  }, register, errors, onChange
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        {...register(name, validation)}
        onChange={e => onChange(e.target.value)}
      />
      <p>{errors[name]?.message}</p>
    </div>
  );
}
