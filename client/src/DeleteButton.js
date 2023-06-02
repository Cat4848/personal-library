export function DeleteButton({ onDelete, id }) {
  return (
    <button className="btn delete-btn" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}
