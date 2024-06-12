import { useState } from "react";
import { commentInit, updateComments } from "./PostUtils";
import "./post.css";

const CommentInput = () => {
  const [comment, setComment] = useState("");

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <div className="comment-input">
      <input
        className="reply-field"
        type="text"
        value={comment}
        onChange={handleInputChange}
      />
      <button
        className="submit-comment-button"
        onClick={() => addComment(comment)}
      >
        submit
      </button>
      <button className="reset-comments-button" onClick={() => clearComments()}>
        Reset comment section
      </button>
    </div>
  );
};

const addComment = (commentText) => {
  const commentId = Number(localStorage.getItem("idCounter")) + 1;
  const newComment = {
    commentId,
    commentText,
    isDeleted: false,
  };

  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments.push(newComment);

  updateComments(comments);
  localStorage.setItem("idCounter", commentId);
};

const clearComments = () => {
  localStorage.removeItem("ranOnce");
  localStorage.removeItem("comments");
  localStorage.removeItem("idCounter");

  commentInit();
  window.dispatchEvent(new CustomEvent("updateList"));
};

export default CommentInput;
