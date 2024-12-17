import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [showSummer, setShowSummer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSummer((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      {/* Winter Collection */}
      <div className={`hero-content winter-collection ${showSummer ? 'slide-out' : 'slide-in'}`}>
        <div className="hero-text">
          <h1>Fall Collection for Winter</h1>
          <p>
            Discover the warmth and comfort of our new Fall Collection designed
            to keep you stylish this winter. From cozy jackets to trendy scarves,
            we've got everything you need for a fashionable season.
          </p>
          <button className="shop-now-btn" onClick={() => navigate('/products/jackets')}>Shop Now</button>
        </div>
        <div className="hero-image">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/039/075/286/non_2x/ai-generated-of-a-beautiful-model-girl-in-beige-clothes-for-advertising-free-photo.jpeg"
            alt="Model showcasing winter collection"
            className="transparent-img"
          />
        </div>
      </div>

      {/* Summer Collection */}
      <div className={`hero-content summer-collection ${showSummer ? 'slide-in' : 'slide-out'}`}>
        <div className="hero-text">
          <h1>Summer Collection</h1>
          <p>
            Explore the latest Summer Collection! Enjoy the warmth and
            comfort of our lightweight, stylish designs. From chic dresses
            to cool accessories, gear up for your summer adventures.
          </p>
          <button className="shop-now-btn" onClick={() => navigate('/products/tops')}>Shop Now</button>
        </div>
        <div className="hero-image">
          <img 
            src="https://media.istockphoto.com/id/1201026026/photo/stylish-man-wearing-sunglasses-and-white-shirt-city-life.jpg?s=612x612&w=0&k=20&c=Lw3M3Eq3Cwwc7OqR4z3xVqEQvRBrGvQXbUDY8jB7eOE="
            alt="Model showcasing summer collection"
            className="transparent-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
