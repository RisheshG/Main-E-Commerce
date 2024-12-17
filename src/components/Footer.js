// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Rishesh fashion<span className="dot">.</span></h2>
          <p>The customer is at the heart of our unique business model, which includes design.</p>
        </div>

        <div className="footer-links">
          <h4>SHOPPING</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products/shoes">Trending Shoes</a></li>
            <li><a href="/products/accessories">Accessories</a></li>
            <li><a href="/products/jackets">Jackets</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>INFORMATION</h4>
          <ul>
            <li><a href="https://drive.google.com/file/d/1oiSAVgfZfRwzjaoPMavx39UdgfP2ekMd/view?usp=sharing">Resume</a></li>
            <li><a href="https://main-portfolio-website-three.vercel.app/">My Portfolio Website</a></li>
            <li><a href="https://github.com/RisheshG">Github</a></li>
            <li><a href="https://www.linkedin.com/in/rishesh-gangwar-bb7026241/">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {currentYear} All rights reserved | This website is made by Rishesh Gangwar</p>
      </div>
    </footer>
  );
};

export default Footer;
