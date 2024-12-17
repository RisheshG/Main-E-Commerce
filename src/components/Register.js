import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import
import './Register.css';

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000;
                if (expirationTime > Date.now()) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem('token');
            }
        } else {
            setIsLoggedIn(false); 
        }
    }, [setIsLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const res = await axios.post('https://e-commerce-backend-ru05.onrender.com/api/users/register', {
                username,
                email,
                password,
            });
            
            
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
                const decodedToken = jwtDecode(res.data.token);
                const userId = decodedToken.userId;
                localStorage.setItem('userId', userId);

                setIsLoggedIn(true);
                navigate('/');
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setError(err.response.data.message);
            } else {
                setError('Error registering user');
            }
            console.error(err);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('https://e-commerce-backend-ru05.onrender.com/api/users/login', {
                email,
                password,
            });
            
            if (res.data?.token) {
                const decodedToken = jwtDecode(res.data.token);
                const userId = decodedToken.userId;
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', userId);

                setIsLoggedIn(true);
                navigate('/');
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            console.error('Login error:', err.response);
            if (err.response?.status === 401) {
                setError(err.response.data.message);
            } else {
                setError('Error logging in user');
            }
        }
    };    

    return (
        <div>
            {showLogin ? (
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                    <button type="button" className="register-btn" onClick={() => setShowLogin(false)}>
                        Don't have an account? Register
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                    {error && (
                        <div>
                            <p>{error}</p>
                        </div>
                    )}
                    <button type="button" className="login-btn" onClick={() => setShowLogin(true)}>
                        Already have an account? Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default Register;
