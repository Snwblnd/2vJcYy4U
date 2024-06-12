import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="comment">
      <div className="comment-text">
        {comment.isDeleted ? (
          <p>This comment has been deleted</p>
        ) : (
          <p>{comment.commentText}</p>
        )}
      </div>
      <div className="replies">
        {comment.comments && (
          <div>
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? "Hide replies" : "Show replies"}
            </button>
            {expanded
              ? comment.comments.map((comment) => {
                  return <Comment comment={comment} key={comment.commentId} />;
                })
              : ""}
          </div>
        )}
      </div>
      <button onClick={() => deleteFunction(comment)}>Delete</button>
      <button onClick={() => replyToComment(comment, "darude")}>Reply</button>
    </div>
  );
};

const findById = (comments, id) => {
  for (let comment of comments) {
    if (comment.commentId === id) {
      return comment;
    }
    if (comment.comments) {
      const result = findById(comment.comments, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

const deleteFunction = (comment) => {
  const comments = JSON.parse(localStorage.getItem("comments"));

  const singleComment = findById(comments, comment.commentId);

  singleComment.isDeleted = true;

  updateComments(comments);
};

const updateComments = (comments) => {
  localStorage.removeItem("comments");

  localStorage.setItem("comments", JSON.stringify(comments));

  window.dispatchEvent(new CustomEvent("updateList"));
};

const replyToComment = (comment, reply) => {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const idCounter = Number(localStorage.getItem("idCounter")) + 1;

  const newComment = {
    commentId: idCounter,
    commentText: reply,
    isDeleted: false,
  };

  const parentComment = findById(comments, comment.commentId);
  if (parentComment) {
    if (!parentComment.comments) {
      parentComment.comments = [];
    }
    parentComment.comments.push(newComment);
    updateComments(comments);
    return true;
  }
  return false;
};

export default Comment;
