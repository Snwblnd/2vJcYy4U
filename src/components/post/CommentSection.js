import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "./post.css";

const CommentSection = () => {
  const comments = commentLoader();

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

const commentLoader = () => {
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

  return comments;
};
