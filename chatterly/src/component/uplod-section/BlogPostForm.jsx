import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './upload.css';
const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    setLoading(true);

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post('http://localhost:8081/upload-post', formData, config);
      console.log('Response:', response);

      if (response.status === 201) {
        alert('Post uploaded successfully');
        setTitle('');
        setDescription('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error uploading blog post:', error.message);
      alert('Failed to upload post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='BlogForm-background'>
      {/* <Navbar /> */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
        <label htmlFor="title">Title</label>
          <input
          name='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          </div>
          <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
          name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          /></div>
          <div className="form-group">
          <label htmlFor="img">Image</label>
          <input
          name='img'
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          /></div>
          <br />
          <button type="submit" disabled={loading}  className="submit-button">
            {loading ? 'Uploading...' : 'Upload Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;