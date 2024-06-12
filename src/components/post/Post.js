import CommentSection from "./CommentSection";
import PostContent from "./PostContent";

const Post = () => {
  return (
    <div className="post-container">
      <PostContent />
      <CommentSection />
    </div>
  );
};

export default Post;
