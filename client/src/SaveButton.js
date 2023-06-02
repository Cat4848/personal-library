export function SaveButton({ updateStateAndDatabase }) {
  return (
    <button className="btn edit-save-btn" onClick={updateStateAndDatabase}>
      Save
    </button>
  );
}
