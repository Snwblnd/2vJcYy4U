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
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide replies" : "Show replies"}
          </button>
        )}
      </div>
      <button>Delete</button>
    </div>
  );
};

export default Comment;
