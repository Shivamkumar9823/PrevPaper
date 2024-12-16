import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // For custom styling (optional)
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);
  console.log(user)
 
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">PrevPapers</Link> {/* Replace with your actual logo */}
      </div>
      <nav className="nav-links">
         {user ? (
          <>
            <span className="user-name"><b> {user} </b></span>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
        {/* <Link to="/Register">Register</Link> */}
        <Link to="/upload">Upload</Link>
      </nav>
    </header>
  );
};

export default Header;
