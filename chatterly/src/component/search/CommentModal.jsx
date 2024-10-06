import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentModal = ({ postId, comments }) => {
  const [commentText, setCommentText] = useState("");
  const [commentCount, setCommentCount] = useState(comments.length);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://blogsite-chatteryl.onrender.com/comments/${postId}`);
        setCommentCount(response.data.comments.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    try {
      const response = await axios.post(`https://blogsite-chatteryl.onrender.com/comment-post/${postId}`, {
        text: commentText,
      });
      setCommentCount(response.data.comments.length);
      setCommentText("");
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  return (
    <div className="comment-modal">
      <h2>Comments: {commentCount}</h2>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Enter your comment"
      />
      <button onClick={handleComment}>Comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <span>{comment.text}</span>
            <span> - {comment.user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentModal;