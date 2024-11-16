import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(""); // Clear previous email errors
    setPasswordError(""); // Clear previous password errors

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login Request Payload:", { email, password });

    

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        const userId = data.user?._id; // Assuming user ID is in data.user._id
        navigate(`/home/${userId}`); // Navigate on successful login
      } else {
        // Handle errors
        if (data.error === "Invalid email") {
          setEmailError("Invalid email address.");
        } else if (data.error === "Invalid password") {
          setPasswordError("Incorrect password. Please try again.");
        } else {
          setEmailError("Invalid email or password.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setEmailError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 id="text">Login</h2>
        <p>
          Don't have an Account? <a href="/createaccount">Sign Up</a>
        </p>
        <form onSubmit={handlelogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? "input-error" : ""}
              required
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? "input-error" : ""}
              required
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
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
