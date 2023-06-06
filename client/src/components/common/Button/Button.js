export default function Button({ name, buttonType, buttonClass, onClick }) {
  return (
    <button type={buttonType} className={`btn ${buttonClass}`} onClick={onClick}>
      {name}
    </button>
  );
}
