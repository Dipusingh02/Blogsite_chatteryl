import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {  BlogPostForm,  Create,  Home, LoginForm, MyBlogPosts, OTPVerification, SignupForm } from './component';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/Upload-blog" element={<BlogPostForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/Myblog" element={<MyBlogPosts />} />
      </Routes>
    </div>
  );
}

export default App;
