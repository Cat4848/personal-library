import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

export default function Message({ success, error }) {
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
    <h6>
      {success && successTemplate}
      {error && errorTemplate}
    </h6>
  )
}
