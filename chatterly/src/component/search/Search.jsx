import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./search.css";
import "./fc.css";


const FileContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/blog-posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:8081/like-post/${id}`);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (id) => {
    try {
      // Add comment logic here
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  return (
    <div className="blog-posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="blog-post-card">
            <img src={`http://localhost:8081/uploads/${post.image}`} alt="Post Image" />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="blog-post-actions">
              <button onClick={() => handleLike(post._id)}>Like</button>
              <button onClick={() => handleComment(post._id)}>Comment</button>
            </div>
            <div className="blog-post-author">
              {post.user ? (
                <span>Posted by {post.user.name}</span>
              ) : (
                <span>Posted by unknown user</span>
              )}
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default FileContainer;