import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });
    const [addressDetails, setAddressDetails] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const errorRef = useRef(null);

    useEffect(() => {
        const { cartItems, totalPrice } = location.state || {};

        if (!cartItems || cartItems.length === 0) {
            console.error('No cart items available for checkout. Redirecting to cart.');
            navigate('/cart');
            return;
        }

        setCartItems(cartItems);
        setTotalPrice(totalPrice);
    }, [location, navigate]);

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePayment = () => {
        if (
            !paymentDetails.cardNumber ||
            !paymentDetails.expiryDate ||
            !paymentDetails.cvv ||
            !paymentDetails.nameOnCard
        ) {
            setError('Please provide all payment details to proceed with the checkout.');
            scrollToError();
            return;
        }

        if (
            !addressDetails.name ||
            !addressDetails.address ||
            !addressDetails.city ||
            !addressDetails.postalCode ||
            !addressDetails.country
        ) {
            setError('Please fill in all the address fields to proceed.');
            scrollToError();
            return;
        }

        setError(''); // Clear any previous errors
        setIsProcessing(true);

        setTimeout(() => {
            console.log('Payment successful:', { paymentDetails, addressDetails });
            setIsProcessing(false);
            navigate('/payment-success');
        }, 7000);
    };

    const scrollToError = () => {
        if (errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            {error && (
                <div ref={errorRef} className="error-message">
                    <i className="error-icon">⚠️</i> {error}
                </div>
            )}

            {isProcessing ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Processing your payment, please wait...</p>
                </div>
            ) : (
                <>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    {item.product ? `${item.product.name} x ${item.quantity}` : 'Unknown Product'}
                                </li>
                            ))}
                        </ul>
                        <h4>Total: ${totalPrice}</h4>
                    </div>

                    <div className="payment-details">
                        <h3>Payment Details</h3>
                        <label>
                            Card Number:
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                placeholder="1234 5678 9012 3456"
                            />
                        </label>
                        <label>
                            Expiry Date:
                            <input
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                placeholder="MM/YY"
                            />
                        </label>
                        <label>
                            CVV:
                            <input
                                type="password"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                placeholder="123"
                            />
                        </label>
                        <label>
                            Name on Card:
                            <input
                                type="text"
                                name="nameOnCard"
                                value={paymentDetails.nameOnCard}
                                onChange={(e) => handleInputChange(e, setPaymentDetails)}
                                placeholder="John Doe"
                            />
                        </label>
                    </div>

                    <div className="address-details">
                        <h3>Address Details</h3>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="name"
                                value={addressDetails.name}
                                onChange={(e) => handleInputChange(e, setAddressDetails)}
                                placeholder="John Doe"
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={addressDetails.address}
                                onChange={(e) => handleInputChange(e, setAddressDetails)}
                                placeholder="123 Main St"
                            />
                        </label>
                        <label>
                            City:
                            <input
                                type="text"
                                name="city"
                                value={addressDetails.city}
                                onChange={(e) => handleInputChange(e, setAddressDetails)}
                                placeholder="New York"
                            />
                        </label>
                        <label>
                            Postal Code:
                            <input
                                type="text"
                                name="postalCode"
                                value={addressDetails.postalCode}
                                onChange={(e) => handleInputChange(e, setAddressDetails)}
                                placeholder="10001"
                            />
                        </label>
                        <label>
                            Country:
                            <input
                                type="text"
                                name="country"
                                value={addressDetails.country}
                                onChange={(e) => handleInputChange(e, setAddressDetails)}
                                placeholder="USA"
                            />
                        </label>
                    </div>

                    <button className="pay-button" onClick={handlePayment}>Pay ${totalPrice}</button>
                </>
            )}
        </div>
    );
};

export default Checkout;
