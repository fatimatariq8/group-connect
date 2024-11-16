import React, { useState } from "react";
import "../styles/createaccount.css"; 
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [major, setMajor] = useState("");
    const [batch, setBatch] = useState("");
    const [gpa, setGPA] = useState("");
    const [emailError, setEmailError] = useState(""); // For email validation error
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault(); 

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@st\.habib\.edu\.pk$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid Habib University email address (e.g., username@st.habib.edu.pk)");
            return;
        } else {
            setEmailError(""); // Clear any previous errors
        }

        // Send a POST request to the backend API to create a new user
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    major,
                    batch,
                    gpa,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("User created:", data);
                const userId = data.user?._id; // Assuming user ID is in data.user._id
                // Navigate on successful login
                navigate(`/home/${userId}`);
            } else {
                console.error("Error creating user:", data.error);
                setEmailError(data.error || "Failed to create an account.");
            }
        } catch (error) {
            console.error("Error:", error);
            setEmailError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="create-account-container">
            <div className="create-account-box">
                <h2 id="text">Create new Account</h2>
                <p>Already Registered? <a href="/login">Login</a></p>

                <form onSubmit={handleSignUp}>
                    {/* Name */}
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* University Email */}
                    <div className="input-group">
                        <label htmlFor="email">Habib University Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your university email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? "input-error" : ""}
                            required
                        />
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>

                    {/* Password */}
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

                    {/* Major */}
                    <div className="input-group">
                        <label htmlFor="major">Major</label>
                        <select
                            id="major"
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="computer_science">Computer Science</option>
                            <option value="electrical_engineering">Electrical Engineering</option>
                            <option value="computer_engineering">Computer Engineering</option>
                            <option value="sdp">Social and Development Policy</option>
                            <option value="cnd">Communication and Design</option>
                            <option value="ch">Comparative Humanities</option>
                        </select>
                    </div>

                    {/* Batch */}
                    <div className="input-group">
                        <label htmlFor="batch">Batch</label>
                        <select
                            id="batch"
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                        </select>
                    </div>

                    {/* GPA */}
                    <div className="input-group">
                        <label htmlFor="gpa">GPA</label>
                        <input
                            type="number"
                            id="gpa"
                            placeholder="Enter your GPA"
                            value={gpa}
                            onChange={(e) => setGPA(e.target.value)}
                            min="1"
                            max="4"
                            step="0.01"
                            required
                        />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
