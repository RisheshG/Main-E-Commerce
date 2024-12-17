import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/register');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">RG</Link>
        </div>
        <ul className="navbar-list">
          <li><Link to="/products/shoes">Shoes</Link></li>
          <li><Link to="/products/accessories">Accessories</Link></li>
          <li><Link to="/products/jeans">Jeans</Link></li>
          <li><Link to="/products/tops">Tops</Link></li>
          <li><Link to="/products/jackets">Jackets</Link></li>
        </ul>
        <div className="navbar-right">
          <button onClick={handleCartClick} className="cart-button">Cart</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <Link to="/register" className="register-button">Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
