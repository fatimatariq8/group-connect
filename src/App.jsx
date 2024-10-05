import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import Dashboard from './pages/home';
import Profile from './pages/profile'; // Import the Profile page
import Login from './pages/login';
import CreateAccount from './pages/createaccount';
// import AboutPage from './components/AboutPage';
// import ContactPage from './components/ContactPage';
// import './styles/GlobalStyles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />  {/* Add Profile route */}
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
