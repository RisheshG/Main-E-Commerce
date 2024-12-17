import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Home2 from './components/Home2';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Cart from './components/Cart'; 
import Checkout from './components/Checkout'; 
import PaymentSuccess from './components/PaymentSuccess';
import Footer from './components/Footer'; 
import Navbar from './components/Navbar'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item._id === product._id);
      if (itemInCart) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        {/* Main content */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <Home2 />
                </>
              } 
            />
            <Route 
              path="/products/:category" 
              element={<ProductList addToCart={addToCart} isLoggedIn={isLoggedIn} />}
            />
            <Route 
              path="/cart" 
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route 
              path="/checkout" 
              element={<Checkout cart={cart} setCart={setCart} />}
            />
            <Route 
              path="/register" 
              element={<Register setIsLoggedIn={setIsLoggedIn} />} 
            />
            <Route 
              path="/payment-success" 
              element={<PaymentSuccess />} 
            />
          </Routes>
        </main>

        {/* Sticky Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
