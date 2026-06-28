import { useState, useEffect } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import "./Comments.css";

function Comments({ taskId }) {

  const storageKey = `comments_${taskId}`;

  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (saved) {

      setComments(saved);

    }

  }, [storageKey]);

  useEffect(() => {

    localStorage.setItem(storageKey, JSON.stringify(comments));

  }, [comments, storageKey]);

  const addComment = () => {

    if (!text.trim()) return;

    const newComment = {

      id: Date.now(),

      user: "Pallavi",

      avatar:
        "https://ui-avatars.com/api/?name=Pallavi&background=2563eb&color=fff",

      message: text,

      time: new Date().toLocaleString(),

      likes: 0

    };

    setComments([newComment, ...comments]);

    setText("");

  };

  const deleteComment = (id) => {

    setComments(comments.filter((c) => c.id !== id));

  };

  const likeComment = (id) => {

    setComments(

      comments.map((comment) =>

        comment.id === id
          ? {
              ...comment,
              likes: comment.likes + 1
            }
          : comment

      )

    );

  };

  return (

    <div className="comments-container">

      <h2>💬 Discussion</h2>

      <div className="comment-input">

        <textarea
          rows="4"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={addComment}>
          <FaPaperPlane />
          Post
        </button>

      </div>

      <div className="comment-list">

        {comments.length === 0 && (

          <p>No comments yet.</p>

        )}

        {comments.map((comment) => (

          <div
            key={comment.id}
            className="comment-card"
          >

            <img
              src={comment.avatar}
              alt=""
            />

            <div className="comment-content">

              <div className="comment-header">

                <h4>{comment.user}</h4>

                <small>{comment.time}</small>

              </div>

              <p>{comment.message}</p>

              <div className="comment-actions">

                <button
                  onClick={() => likeComment(comment.id)}
                >
                  👍 {comment.likes}
                </button>

                <button
                  onClick={() => deleteComment(comment.id)}
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Comments;