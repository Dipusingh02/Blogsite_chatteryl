import React from 'react';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import {  BlogPostForm,  Home, LoginForm, MyBlogPosts, OTPVerification, SignupForm } from './component';
=======
import {  BlogPostForm,  Create,  Home, LoginForm, MyBlogPosts, OTPVerification, SignupForm } from './component';
>>>>>>> teammate/main


const App = () => {
  return (
    <div>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LoginForm /> } />
=======
        <Route path='/' element={<Create />} />
>>>>>>> teammate/main
        <Route path="/home" element={<Home /> } />
        <Route path="/Upload-blog" element={<BlogPostForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
<<<<<<< HEAD
      
        <Route path="/Myblog" element={<MyBlogPosts />} />

=======
        <Route path="/Myblog" element={<MyBlogPosts />} />
>>>>>>> teammate/main
      </Routes>
    </div>
  );
}

export default App;
