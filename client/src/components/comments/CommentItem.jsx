const CommentItem = ({ comment }) => {
  return (
    <div className="border-b py-3">
      <h4 className="font-semibold">
        {comment.user}
      </h4>

      <p>{comment.message}</p>

      <small className="text-gray-500">
        {new Date(comment.createdAt).toLocaleString()}
      </small>
    </div>
  );
};

export default CommentItem;