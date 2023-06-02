import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SaveButton } from "./SaveButton";
import { updateUtility } from "./updateUtility";

export function Author({ author, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const authorsUrl = "http://localhost:4000/authors/";

  let content;
  if (isEditing) {
    content = (
      <div>
        <input
          value={author.name}
          onChange={(e) =>
            onUpdate({
              ...author,
              name: e.target.value
            })
          }
        />
        <SaveButton
          updateStateAndDatabase={() => updateUtility({
            url: authorsUrl,
            item: author,
            isEditing: isEditing,
            setIsEditing: setIsEditing
          })}
        />
      </div>
    );
  } else {
    content = (
      <div className="author-row-content">
        {author.name}
        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    );
  }

  return (
    <div className="author-row">
      {content}
      <DeleteButton onDelete={onDelete} id={author._id} />
    </div>
  );
}
