import './footer.css';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>©2024 Chatterly INC. All rights reserved.</p>
        <p>
          <a href="/home">Terms & Conditions</a> | 
          <a href="/home"> Policy</a> | 
          <a href="/home"> Support</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;