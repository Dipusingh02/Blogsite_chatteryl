import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import "./fc.css";
import { FaHeart, FaComment } from 'react-icons/fa';

const FileContainer = () => {
<<<<<<< HEAD
=======

>>>>>>> teammate/main
  const [posts, setPosts] = useState([]); 
  const [likes, setLikes] = useState(0);
  
  useEffect(() => {
<<<<<<< HEAD
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://blogsite-chatteryl.onrender.com/blog-posts`);
        setPosts(response.data || []); // Ensure response.data is an array, or fallback to an empty array
      } catch (error) {
        console.error("Error fetching posts:", error);
=======

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/blog-posts`);
        setPosts(response.data || []); // Ensure response.data is an array, or fallback to an empty array
      } catch (error) {
        console.error("Error fetching posts : ", error);
>>>>>>> teammate/main
        setPosts([]); // Set to empty array on error to avoid undefined issues
      }
    };

    fetchPosts();
  }, []);
  
  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
<<<<<<< HEAD
        `https://blogsite-chatteryl.onrender.com/like-post/${id}`,
=======
        `http://localhost:8081/like-post/${id}`,
>>>>>>> teammate/main
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the post with the liked status
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, liked: response.data.liked } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
      // Error handling code
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
<<<<<<< HEAD
            <img src={`https://blogsite-chatteryl.onrender.com/uploads/${post.image}`} alt="Post Image" />
            <h2>{post.title}</h2>
=======
            <img src={`http://localhost:8081/uploads/${post.image}`} alt="Post Image" />
            <center><h2>{post.title}</h2></center>
            <br /> 
>>>>>>> teammate/main
            <p>{post.description}</p>
            <div className="blog-post-actions">
              <button onClick={() => {
                handleLike(post._id)
                if(likes == 0){
                  setLikes(1);
                } else {
                  setLikes(0);
                }
              }}>
<<<<<<< HEAD
        
=======

>>>>>>> teammate/main
            Like <FaHeart /> {likes}
              </button>
              <button onClick={() => handleComment(post._id)}> Comment <FaComment/></button>
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
<<<<<<< HEAD
=======
  
>>>>>>> teammate/main
};

export default FileContainer;
