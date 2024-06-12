import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "./post.css";

const CommentSection = () => {
  const comments = commentLoader();

  return (
    <div className="comment-section">
      <div className="comments">
        {comments.map((comment, index) => {
          console.log(comment);
          return <Comment key={index} comment={comment} />;
        })}
      </div>
      <CommentInput />
    </div>
  );
};

export default CommentSection;

const commentLoader = () => {
  const comments = ["this looks dope!", "can't wait to try!"];

  return comments;
};
