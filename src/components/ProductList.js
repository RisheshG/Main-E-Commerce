import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ addToCart, isLoggedIn }) => {
    const [products, setProducts] = useState([]);
    const [animatingProduct, setAnimatingProduct] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://e-commerce-backend-ru05.onrender.com/api/products');
                const filteredProducts = res.data.filter(product => 
                    product.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filteredProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, [category]);

    const handleAddToCart = async (product) => {
        if (!isLoggedIn) {
            navigate('/register');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const cartItem = {
                productId: product._id,
                userId: userId,
                quantity: 1
            };

            
            await axios.post('https://e-commerce-backend-ru05.onrender.com/api/cart', cartItem);

            addToCart(product); // Call the function to add to cart (if needed)
            setAnimatingProduct(product._id);
            setTimeout(() => {
                setAnimatingProduct(null);
            }, 400);
        } catch (err) {
            console.error("Error adding item to cart:", err);
        }
    };

    return (
        <div>
            <div className="product-title">
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            </div>
            {products.length === 0 ? (
                <p>No products available for {category}</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <div className="rating">
                                {'★'.repeat(product.rating)}
                                {'☆'.repeat(5 - product.rating)}
                            </div>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <button 
                                className={`add-to-cart-button ${animatingProduct === product._id ? 'animate' : ''}`} 
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );    
};

export default ProductList;
