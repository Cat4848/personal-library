export function updateUtility({ url, item, isEditing, setIsEditing }) {
  setIsEditing(!isEditing);
  fetch(`${url}${item._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(item)
  });
}