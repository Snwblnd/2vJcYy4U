export const findById = (comments, id) => {
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

export const deleteFunction = (comment) => {
  const comments = JSON.parse(localStorage.getItem("comments"));

  const singleComment = findById(comments, comment.commentId);

  singleComment.isDeleted = true;

  updateComments(comments);
};

export const updateComments = (comments) => {
  localStorage.removeItem("comments");

  localStorage.setItem("comments", JSON.stringify(comments));

  window.dispatchEvent(new CustomEvent("updateList"));
};

export const replyToComment = (comment, reply) => {
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
    localStorage.setItem("idCounter", idCounter);
    return true;
  }
  return false;
};

export const commentsLoader = () => {
  const comments = localStorage.getItem("comments");

  return JSON.parse(comments);
};

export const commentInit = () => {
  const ranOnce = localStorage.getItem("ranOnce");

  if (ranOnce === "true") return;

  localStorage.removeItem("comments");
  localStorage.removeItem("idCounter");

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
          commentText: "wow!",
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

export const clearComments = () => {
  localStorage.removeItem("ranOnce");
  localStorage.removeItem("comments");
  localStorage.removeItem("idCounter");

  commentInit();
  window.dispatchEvent(new CustomEvent("updateList"));
};

export const addComment = (commentText) => {
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
