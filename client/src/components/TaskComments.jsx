import { useEffect, useState } from "react";
import axios from "axios";

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/comments/${taskId}`
    );

    setComments(res.data.comments);
  };

  const addComment = async () => {
    await axios.post(
      "http://localhost:5000/api/comments",
      {
        taskId,
        author: "Admin",
        text,
      }
    );

    setText("");

    loadComments();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-5">

      <h2 className="text-xl font-bold mb-3">
        💬 Comments
      </h2>

      {comments.map((item) => (
        <div
          key={item._id}
          className="border-b py-2"
        >
          <strong>{item.author}</strong>

          <p>{item.text}</p>
        </div>
      ))}

      <input
        className="border w-full p-2 mt-4"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Write comment..."
      />

      <button
        onClick={addComment}
        className="bg-blue-600 text-white px-5 py-2 mt-3 rounded"
      >
        Add Comment
      </button>

    </div>
  );
};

export default TaskComments;