import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import Dashboard from './pages/home';
import Login from './pages/login';
import CreateAccount from './pages/createaccount';
import Profile from './pages/profile'
import Help from './pages/help'
import CoursePage from './pages/coursepage'; // Import CoursePage here



// import AboutPage from './components/AboutPage';
// import ContactPage from './components/ContactPage';
// import './styles/GlobalStyles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home/:id" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/help/:id" element={<Help />} />
        <Route path="/coursepage/:id/:courseId" element={<CoursePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
