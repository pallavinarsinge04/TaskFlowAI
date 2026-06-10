import { useState } from "react";
import axios from "axios";

const CommentBox = ({ taskId }) => {
  const [message, setMessage] = useState("");

  const addComment = async () => {
    await axios.post("http://localhost:5000/api/comments", {
      taskId,
      user: "Pallavi",
      message,
    });

    setMessage("");
  };

  return (
    <div className="mt-4">
      <textarea
        className="w-full border rounded-lg p-3"
        placeholder="Write a comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={addComment}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentBox;