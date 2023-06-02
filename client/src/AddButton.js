export function AddButton({ name }) {
  const nameCapitalized = name[0].toUpperCase() + name.slice(1, -1);
  return (
    <button className="btn add-btn" type="submit">
      Add {nameCapitalized}
    </button>
  );
}
