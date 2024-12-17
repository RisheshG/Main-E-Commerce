import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 

        if (userId) {
            fetchCartItemsFromServer(userId);
        } else {
            fetchCartItemsFromLocalStorage();
        }
    }, []);

    const fetchCartItemsFromServer = async (userId) => {
        try {
            const res = await axios.get(`https://e-commerce-backend-ru05.onrender.com/api/cart/${userId}`);
            setCartItems(res.data);
            calculateTotalPrice(res.data);
        } catch (err) {
            console.error('Error fetching cart items:', err);
            setError('Error fetching cart items');
        }
    };

    const fetchCartItemsFromLocalStorage = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        calculateTotalPrice(cart);
    };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => {
            if (item.product) { 
                return acc + item.product.price * item.quantity;
            }
            return acc;
        }, 0);
        setTotalPrice(total.toFixed(2));
    };

    const saveCartToLocalStorage = (updatedCartItems) => {
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleCheckout = () => {
        if (!localStorage.getItem('userId')) {
            alert('You need to log in to complete the checkout process.');
            navigate('/login');
            return;
        }
        navigate('/checkout', { state: { cartItems, totalPrice } });
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                await axios.post(`https://e-commerce-backend-ru05.onrender.com/api/cart/update`, { userId, itemId, quantity: newQuantity });
                updateCartItems(itemId, newQuantity);
            } catch (error) {
                console.error('Error updating quantity:', error);
                setError('Error updating quantity');
            }
        } else {
            updateCartItems(itemId, newQuantity);
        }
    };

    const updateCartItems = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        saveCartToLocalStorage(updatedCartItems);
    };

    const handleDelete = async (itemId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                await axios.delete(`https://e-commerce-backend-ru05.onrender.com/api/cart/${userId}/${itemId}`);
                removeCartItem(itemId);
            } catch (error) {
                console.error('Error deleting item:', error);
                setError('Error deleting item');
            }
        } else {
            removeCartItem(itemId);
        }
    };

    const removeCartItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        saveCartToLocalStorage(updatedCartItems);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {error && <p className="error">{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={item._id || item.tempId} className="cart-item">
                                {item.product ? (
                                    <>
                                        <h3>{item.product.name}</h3>
                                        <p>Price: ${item.product.price.toFixed(2)}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleQuantityChange(item._id || item.tempId, item.quantity - 1)}>-</button>
                                            <span>Quantity: {item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item._id || item.tempId, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="delete-button" onClick={() => handleDelete(item._id || item.tempId)}>Remove</button>
                                    </>
                                ) : (
                                    <p>Product details are not available for this item.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h3>Total: ${totalPrice}</h3>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
