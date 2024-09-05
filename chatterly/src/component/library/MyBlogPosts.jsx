
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const MyBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8081/my-blog-posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
    <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="blog-posts-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="blog-post-card">
              <img src={`http://localhost:8081/uploads/${post.image}`} alt="Post Image" />
 
              <h2>{post.title}</h2>
                <p>{post.description}</p>
                <span> <h5>Post On   {new Date(post.createdAt).toLocaleDateString()}</h5></span>
                </div>
            ))
          ) : (
            <p>No blog posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBlogPosts;
