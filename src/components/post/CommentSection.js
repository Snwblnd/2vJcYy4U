import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "./post.css";
import { useEffect, useState } from "react";

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

export const commentSetter = ({ comment }) => {
  const commentId = Number(localStorage.getItem("idCounter")) + 1;
  localStorage.setItem(commentId, JSON.stringify(comment));
};

const commentsLoader = () => {
  const comments = localStorage.getItem("comments");

  return JSON.parse(comments);
};

const commentInit = () => {
  const ranOnce = localStorage.getItem("ranOnce");

  if (ranOnce === "true") return;

  localStorage.removeItem("comments");

  const comments = [
    {
      commentId: 1,
      commentText: "this looks great!",
      isDeleted: false,
      comments: [
        {
          commentId: 3,
          commentText: "i agree!",
          isDeleted: false,
          comments: [
            {
              commentId: 5,
              commentText: "love your username",
              isDeleted: false,
            },
          ],
        },
        {
          commentId: 4,
          commentText: "this looks great!",
          isDeleted: false,
        },
      ],
    },
    {
      commentId: 2,
      commentText: "can't wait to try this!",
      isDeleted: false,
    },
  ];

  localStorage.setItem("idCounter", 5);
  localStorage.setItem("comments", JSON.stringify(comments));
  localStorage.setItem("ranOnce", true);

  return comments;
};
