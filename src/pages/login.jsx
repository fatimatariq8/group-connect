import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
    
        // Send login request to backend
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                const userId = data.user?._id; // Assuming user ID is in data.user._id
                // Navigate on successful login
                navigate(`/home/${userId}`); 
            } else {
                console.error('Login failed:', data.error);
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to login. Please try again.');
        }
    };
    

    return (
        <div className="login-container">   
            <div className="login-box">
                <h2 id="text">Login</h2>
                
                <p>Don't have an Account? <a href="/createaccount">Sign Up</a></p>
                <form onSubmit={handlelogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="image-section">
                <img
                    src="../pictures/loginpic.png"
                    alt="GroupConnect Logo"
                    className="left-image"
                />
            </div>
        </div>
    );
};

export default Login;
