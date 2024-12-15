import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // For custom styling (optional)

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">PrevPapers</Link> {/* Replace with your actual logo */}
      </div>
      <nav className="nav-links">
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
        <Link to="/upload">Upload</Link>
      </nav>
    </header>
  );
};

export default Header;
