import React, { useState } from "react";
import "./post.css";
import { deleteFunction, replyToComment } from "./PostUtils";

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
      <button onClick={() => deleteFunction(comment)}>Delete</button>
      <button onClick={() => replyToComment(comment, "darude")}>Reply</button>
      {comment.comments && (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide replies" : "Show replies"}
        </button>
      )}
      <div className="replies">
        {expanded
          ? comment.comments.map((comment) => {
              return (
                <div className="reply" key={comment.commentId}>
                  <Comment comment={comment} />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Comment;
