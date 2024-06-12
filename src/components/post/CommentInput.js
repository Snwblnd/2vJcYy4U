import "./post.css";

const CommentInput = ({ replyFunction, comment, setComment }) => {
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleReply = () => {
    replyFunction(comment);
    setComment("");
  };

  return (
    <div className="comment-input">
      <input
        className="reply-field"
        type="text"
        value={comment}
        onChange={handleInputChange}
      />
      <button className="submit-comment-button" onClick={handleReply}>
        submit
      </button>
    </div>
  );
};

export default CommentInput;
