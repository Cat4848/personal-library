import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

export function Message({ success, error }) {
  const successTemplate = (
    <div className="success-container">
      <FaThumbsUp /> {success}
    </div>
  );

  const errorTemplate = (
    <div className="error-container">
      <FaThumbsDown /> {error}
    </div>
  );

  return (
    <>
      {success && successTemplate}
      {error && errorTemplate}
    </>
  )
}
