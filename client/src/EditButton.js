export function EditButton({ isEditing, setIsEditing }) {
  return (
    <button className="btn edit-save-btn" onClick={() => setIsEditing(!isEditing)}>
      Edit
    </button>
  );
}
