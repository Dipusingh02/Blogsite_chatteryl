import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeModal = ({ postId, likes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`https://blogsite-chatteryl.onrender.com/likes/${postId}`);
        setLikeCount(response.data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await axios.put(`https://blogsite-chatteryl.onrender.com/like-post/${postId}`);
      setLikeCount(response.data.likes);
      setHasLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.put(`https://blogsite-chatteryl.onrender.com/unlike-post/${postId}`);
      setLikeCount(response.data.likes);
      setHasLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <div className="like-modal">
      <h2>Likes: {likeCount}</h2>
      {hasLiked ? (
        <button onClick={handleUnlike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
    </div>
  );
};

export default LikeModal;