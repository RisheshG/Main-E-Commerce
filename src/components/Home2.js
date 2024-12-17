import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home2.css';

const Home2 = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const productSets = [
    [
      { title: 'Sunglasses', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIw3dJN9jf6HAciOB58OOsaignlSupgLA5Ig&s', path: '/products/accessories' },
      { title: 'Shoes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6qvEDDsDgCm2ofBNYwY-7aHpKNTMaKQjIA&s', path: '/products/shoes' },
      { title: 'Jackets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZxx2-wb4JYNZMb4F2v0a_sJ1ZMwC0nhACg&s', path: '/products/jackets' },
    ],
    [
      { title: 'Watches', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt_0nMT1f8HPGUpWzB0JKNpVRj79Uu_v2p-A&s', path: '/products/accessories' },
      { title: 'Bags', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGsWGmhUFZljTHSr0Jrwo-Dscp2DM3VSd2g&s', path: '/products/accessories' },
      { title: 'Jeans', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrnNoi3qOA7ou_Rnw1x2Eh9EFeWynuS_dqA&s', path: '/products/jeans' },
    ],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveSet((prevSet) => (prevSet + 1) % productSets.length);
        setTransitioning(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [productSets.length]);

  return (
    <div className="categories-section">
      <h2 className="section-title">Explore Our Categories</h2>
      <p className="section-subtitle">Find what fits your style</p>

      <div className="product-set">
        {productSets[activeSet].map((product, index) => (
          <div
            key={index}
            className={`category-card ${transitioning ? 'fade-out' : 'fade-in'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <button className="shop-now-btn" onClick={() => navigate(product.path)}>Shop Now</button>
          </div>
        ))}
      </div>

      <svg className="decorative-shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ff6347" d="M0,128L60,149.3C120,171,240,213,360,234.7C480,256,600,256,720,250.7C840,245,960,235,1080,240C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"></path>
      </svg>
    </div>
  );
};

export default Home2;
