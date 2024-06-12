import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "./post.css";
import { useEffect, useState } from "react";
import { commentInit, commentsLoader } from "./PostUtils";

const CommentSection = () => {
  const [comments, setComments] = useState([]);

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
      <CommentInput />
    </div>
  );
};

export default CommentSection;
