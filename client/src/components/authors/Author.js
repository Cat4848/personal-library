import { useState } from "react";
import { Button } from "../common/Button";
import { updateUtility } from "../../utils/updateUtility";

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
        <Button
          buttonType={"button"}
          buttonClass={"edit-save-btn"}
          name={"Save"}
          onClick={() =>
            updateUtility({
              url: authorsUrl,
              item: author,
              isEditing: isEditing,
              setIsEditing: setIsEditing
            })
          }
        />
      </div>
    );
  } else {
    content = (
      <div className="author-row-content">
        {author.name}
        <Button
          name={"Edit"}
          buttonType={"button"}
          buttonClass={"edit-save-btn"}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>
    );
  }

  return (
    <div className="author-row">
      {content}
      <Button
        name={"Delete"}
        buttonType={"button"}
        buttonClass={"delete-btn"}
        onClick={() => onDelete(author._id)}
      />
    </div>
  );
}
