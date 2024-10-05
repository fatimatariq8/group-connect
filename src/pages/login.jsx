import React from "react";
import "../styles/login.css"; // Importing CSS for the login page
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault(); // Prevent form submission if needed

        // Perform any sign-up logic here

        // After successful sign-up, navigate to the dashboard
        navigate('/createaccount');
    };

  return (
    <div className="login-container">   
        <div className="login-box">
        <h2>Login</h2>
        
        <p>Don't have an Account? <a href="/createaccount">Sign Up</a></p>
        <form onSubmit={handlelogin}>
            <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
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
}

export default Login;
