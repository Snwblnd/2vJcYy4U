import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "./post.css";
import { useEffect, useState } from "react";
import {
  commentInit,
  commentsLoader,
  clearComments,
  addComment,
} from "./PostUtils";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    commentInit();
    loadComments();

    const handleUpdateList = () => {
      loadComments();
    };

    window.addEventListener("updateList", handleUpdateList);

    return () => {
      window.removeEventListener("updateList", handleUpdateList);
    };
  }, []);

  const loadComments = () => {
    const loadedComments = commentsLoader();
    setComments(loadedComments || []);
  };

  return (
    <div className="comment-section">
      <h1>Comments</h1>
      <div className="comments">
        {comments.map((comment) => {
          console.log(comment);
          return <Comment key={comment.commentId} comment={comment} />;
        })}
      </div>
      <CommentInput
        replyFunction={addComment}
        comment={comment}
        setComment={setComment}
      />
      <button className="reset-comments-button" onClick={() => clearComments()}>
        Reset comment section
      </button>
    </div>
  );
};

export default CommentSection;
